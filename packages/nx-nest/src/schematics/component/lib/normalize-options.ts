import { normalize } from '@angular-devkit/core'
import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { names } from '@nrwl/devkit'
import { readNxJson } from '@nrwl/workspace'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { Listr } from 'listr2'
import { join } from 'path'

import { ComponentLocationsMap } from '../interfaces/file.constants'
import { AvailableComponentsSelection, NormalizedSchema, Schema } from '../main.interface'
import { AvailableComponents, AvailableServerTypes, PrettyNamesForAvailableThingies } from '@interfaces/available.constants'
import { NxNestProjectIntegration } from '@src/integration'
import { SchematicConstants } from '@src/interfaces'
import { generateMicroserviceCasing } from '@src/utils'
import { ConvertToPromptType, generateNameCases, isVerbose, normalizeParentConfigurationTask, readWorkspaceProjects, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'

/**
 * @param  {Tree} host
 * @param  {SchematicContext} context
 * @param  {Schema} options This should be unparsed options entry coming from the Angular schematics.
 * @returns Promise
 * Normalizes options for given schematic.
 */
export async function normalizeOptions (host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, {
            default: [ options, { constants: SchematicConstants } ]
          })
        }
      },

      // prompt parent application
      {
        skip: (ctx): boolean => !!ctx.parent,
        task: async (ctx, task): Promise<void> => {
          const projects = readWorkspaceProjects<NxNestProjectIntegration>(host)

          if (Object.keys(projects).length === 0) {
            throw new Error('No project has been found in the workspace.')
          }

          ctx.parent = await task.prompt({
            type: 'AutoComplete',
            message: 'Please select an existing application as the parent.',
            choices: Object.entries(projects).reduce((o, [ name, project ]) => {
              if (project.integration?.nestjs) {
                o = [ ...o, name ]
              }

              return o
            }, [] as string[])
          })
        }
      },

      // prompt for component name
      {
        skip: (ctx): boolean => !!ctx.name,
        task: async (ctx, task): Promise<void> => {
          ctx.name = await task.prompt({
            type: 'Input',
            message: 'Please give a name to will be generated component.'
          })
        }
      },

      // check for parent application configuration
      normalizeParentConfigurationTask<NormalizedSchema, NxNestProjectIntegration>(host, 'nestjs', [ 'root', 'sourceRoot' ]),

      // parse component name and convert casings to use in template
      {
        title: 'Normalizing component name.',
        task: (ctx, task): void => {
          ctx.name = names(ctx.name).fileName

          ctx.casing = {
            ...generateNameCases(ctx.name),
            injected: {
              microservices: generateMicroserviceCasing(ctx.parent)
            }
          }

          task.title = `Component name is set as "${ctx.name}".`
        }
      },

      // need package scope for imports and such
      {
        task: (ctx): void => {
          const nxJson = readNxJson()
          ctx.packageScope = `${nxJson.npmScope}`
        }
      },

      // select comnponent type
      {
        enabled: (ctx): boolean => ctx.type === undefined,
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableComponentsSelection> = ctx.parentPriorConfiguration.components
            .map((c) => {
              if ([ AvailableComponents.SERVER ].includes(c)) {
                return [
                  { name: AvailableServerTypes.RESTFUL, message: PrettyNamesForAvailableThingies[AvailableServerTypes.RESTFUL] },
                  { name: AvailableServerTypes.GRAPHQL, message: PrettyNamesForAvailableThingies[AvailableServerTypes.GRAPHQL] }
                ]
              } else if ([ AvailableComponents.BG_TASK, AvailableComponents.COMMAND, AvailableComponents.MICROSERVICE_SERVER ].includes(c)) {
                return { name: c as AvailableComponentsSelection, message: PrettyNamesForAvailableThingies[c] }
              }
            })
            .filter(Boolean)
            .flat()

          // select the base components
          // when options are not passed as an option to the command
          ctx.type = await task.prompt<AvailableComponentsSelection>({
            type: 'Select',
            message: 'Please select the component type.',
            choices
          })

          task.title = `Components type selected: ${ctx.type}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // set component root directory
      {
        title: 'Setting component root directory.',
        task: async (ctx, task): Promise<void> => {
          const basePath = join(ctx.parentProjectConfiguration.root, ctx.parentProjectConfiguration.sourceRoot)
          const root = ComponentLocationsMap[ctx.type].find((t) => directoryExists(join(process.cwd(), basePath, t)))

          if (root) {
            ctx.root = normalize(join(basePath, root))
          } else {
            ctx.root = normalize(join(basePath, ComponentLocationsMap[ctx.type].shift()))
          }

          if (
            directoryExists(join(ctx.root, ctx.name)) &&
            !ctx.force &&
            !await task.prompt({
              type: 'Toggle',
              message: `Component "${ctx.name}"@"${ctx.root}" already exists. Do you want to try to overwrite?`,
              initial: true
            })
          ) {
            throw new Error(`Cancelled generation of component: "${ctx.name}"@"${ctx.root}"`)
          }

          task.title = `Component root directory is set as: ${ctx.root}`
        }
      },

      // ask for controller root when server
      {
        enabled: (ctx): boolean => ctx.mount === undefined,
        skip: (ctx): boolean => ctx.type !== AvailableServerTypes.RESTFUL,
        task: async (ctx, task): Promise<void> => {
          ctx.mount = await task.prompt({ type: 'Input', message: 'Please give a mount point to this component.' })

          task.title = `Component mount point set as: ${ctx.mount}`
        }
      }
    ],
    {
      rendererFallback: isVerbose(),
      rendererSilent: options.silent
    }
  ).run()
}
