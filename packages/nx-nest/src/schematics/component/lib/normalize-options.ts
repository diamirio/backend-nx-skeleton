import { normalize } from '@angular-devkit/core'
import type { SchematicContext, Tree } from '@angular-devkit/schematics'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { Listr } from 'listr2'
import { join } from 'path'

import { ComponentLocationsMap } from '../interfaces/file.constants'
import type { AvailableComponentsSelection, NormalizedSchema, Schema } from '../main.interface'
import type { NxNestProjectIntegration } from '@integration'
import { SchematicConstants } from '@interfaces'
import { AvailableComponents, AvailableServerTypes, PrettyNamesForAvailableThingies } from '@interfaces/available.constants'
import { generateMicroserviceCasing } from '@utils'
import type { ConvertToPromptType } from '@webundsoehne/nx-tools'
import {
  generateNameCases,
  isVerbose,
  normalizeNameWithParentApplicationPrompt,
  normalizeParentPriorConfigurationPrompt,
  normalizeWorkspacePackageScopePrompt,
  setSchemaDefaultsInContext
} from '@webundsoehne/nx-tools'

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
            default: [options, { constants: SchematicConstants }]
          })
        }
      },

      ...normalizeNameWithParentApplicationPrompt<NormalizedSchema, NxNestProjectIntegration>(host, (_name, project) => {
        if (project.integration?.nestjs) {
          return true
        }
      }),

      // check for parent application configuration
      ...normalizeParentPriorConfigurationPrompt<NormalizedSchema, NxNestProjectIntegration>(host, 'nestjs'),

      // need package scope for imports and such
      ...normalizeWorkspacePackageScopePrompt(host),

      // parse component name and convert casings to use in template
      {
        title: 'Normalizing component name.',
        task: (ctx, task): void => {
          const names = generateNameCases(ctx.name)

          ctx.name = names.kebab

          ctx.casing = {
            ...names,
            injected: {
              microservices: generateMicroserviceCasing(ctx.parent)
            }
          }

          task.title = `Component name is set as "${ctx.name}".`
        }
      },

      // select comnponent type
      {
        enabled: (ctx): boolean => ctx.type === undefined,
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableComponentsSelection> = ctx.parentPriorConfiguration.components
            .map((c) => {
              if ([AvailableComponents.SERVER].includes(c)) {
                return [
                  { name: AvailableServerTypes.RESTFUL, message: PrettyNamesForAvailableThingies[AvailableServerTypes.RESTFUL] },
                  { name: AvailableServerTypes.GRAPHQL, message: PrettyNamesForAvailableThingies[AvailableServerTypes.GRAPHQL] }
                ]
              } else if ([AvailableComponents.BG_TASK, AvailableComponents.COMMAND, AvailableComponents.MICROSERVICE_SERVER].includes(c)) {
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
