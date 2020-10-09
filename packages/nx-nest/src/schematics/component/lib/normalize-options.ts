import { normalize } from '@angular-devkit/core'
import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { toFileName } from '@nrwl/workspace'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { ConvertToPromptType, EnrichedWorkspaceJsonProject, readNxIntegration, readWorkspaceJson, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'
import { camelCase, pascalCase } from 'change-case'
import { Listr } from 'listr2'
import { join } from 'path'

import { AvailableComponentsSelection, NormalizedSchema, Schema } from '../main.interface'
import { AvailableComponents, AvailableServerTypes } from '@src/interfaces'
import { NormalizedSchema as ApplicationNormalizedSchema } from '@src/schematics/application/main.interface'

/**
 * @param  {Tree} host
 * @param  {SchematicContext} context
 * @param  {Schema} options This should be unparsed options entry coming from the Angular schematics.
 * @returns Promise
 * Normalizes options for given schematic.
 */
export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          setSchemaDefaultsInContext(ctx, { assign: { from: options, keys: [ 'name', 'parent', 'force', 'type', 'parentWsConfiguration', 'silent' ] } })
        }
      },

      // check for prior configuration
      {
        title: 'Checking for parent application.',
        enabled: (ctx): boolean => ctx.parentWsConfiguration === undefined,
        task: (ctx, task): void => {
          // if this is created with this schematic there should be a nx json
          task.title = 'Looking for prior application configuration in "nx.json".'

          const parentConfiguration = readNxIntegration<ApplicationNormalizedSchema['priorConfiguration']>(ctx.parent)

          if (parentConfiguration) {
            ctx.parentPriorConfiguration = parentConfiguration

            task.title = 'Prior configuration successfully found in "nx.json".'
          } else {
            throw new Error('Can not read prior configuration from "nx.json".')
          }

          // check parent configuration in workspace
          task.title = 'Looking for prior application configuration in "workspace.json".'

          const workspace = readWorkspaceJson(ctx.parent)

          if (workspace && workspace.root && workspace.sourceRoot) {
            ctx.parentWsConfiguration = ([ 'root', 'sourceRoot' ] as (keyof EnrichedWorkspaceJsonProject)[]).reduce((o, item) => {
              return { ...o, [item]: workspace[item] }
            }, {} as EnrichedWorkspaceJsonProject)
          } else {
            throw new Error('Can not read application configuration from "workspace.json".')
          }
        }
      },

      // remove unwanted charachters from directory name
      {
        title: 'Normalizing component name.',
        task: (ctx, task): void => {
          ctx.name = toFileName(options.name)

          ctx.casing = {
            pascal: pascalCase(ctx.name),
            camel: camelCase(ctx.name)
          }

          task.title = `Component name is set as "${ctx.name}".`
        }
      },

      // select server functionality
      {
        enabled: (ctx): boolean => ctx.type === undefined,
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableComponentsSelection> = ctx.parentPriorConfiguration.components.map((c) => {
            if (c === 'server' || c === 'bgtask' || c === 'command' || c === 'microservice-server') {
              return { name: c as AvailableComponentsSelection, message: c }
            }
          })

          // select the base components
          // when options are not passed as an option to the command
          const prompt = await task.prompt<AvailableComponentsSelection>({
            type: 'Select',
            message: 'Please select the component type.',
            choices: choices as any
          })

          // parse the prompt depending on the prior configuration
          if (prompt === AvailableComponents.SERVER) {
            ctx.type = ctx.parentPriorConfiguration.server
          } else {
            ctx.type = prompt
          }

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
          const rootMap: Record<typeof ctx.type, string> = {
            [AvailableServerTypes.RESTFUL]: 'server',
            [AvailableServerTypes.GRAPHQL]: 'server',
            [AvailableComponents.BG_TASK]: 'task',
            [AvailableComponents.COMMAND]: 'command',
            [AvailableComponents.MICROSERVICE_SERVER]: 'microservice-server'
          }

          ctx.root = normalize(join(ctx.parentWsConfiguration.root, ctx.parentWsConfiguration.sourceRoot, rootMap[ctx.type], 'modules'))

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

          task.title = `Component root directory is set as "${ctx.root}".`
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: context.debug,
      rendererSilent: options.silent
    }
  ).run()
}
