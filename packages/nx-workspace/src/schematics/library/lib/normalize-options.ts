import { normalize } from '@angular-devkit/core'
import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { names } from '@nrwl/devkit'
import { readNxJson } from '@nrwl/workspace'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { AvailableLibraryTypes, PrettyNamesForAvailableThingies } from '@interfaces/available.constants'
import { NxWorkspaceIntegration } from '@src/integration'
import {
  AvailableSchemaModes,
  AvailableTestsTypes,
  getInitialFromPriorConfiguration,
  isVerbose,
  mapPromptChoices,
  readNxProjectIntegration,
  readWorkspaceLayout,
  readWorkspaceProjects,
  setSchemaDefaultsInContext
} from '@webundsoehne/nx-tools'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, {
            default: [
              options,
              {
                sourceRoot: 'src'
              }
            ]
          })
        }
      },

      // select generator mode
      {
        skip: (ctx): boolean => !!ctx.mode,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableSchemaModes>(AvailableSchemaModes, PrettyNamesForAvailableThingies)

          ctx.mode = await task.prompt({
            type: 'Select',
            message: 'Select the generator mode.',
            choices
          })
        }
      },

      // select application name
      {
        skip: (ctx): boolean => !(ctx.mode === AvailableSchemaModes.CREATE && !ctx.name),
        task: async (ctx, task): Promise<void> => {
          ctx.name = await task.prompt({
            type: 'Input',
            message: 'Give the new library a name.'
          })
        }
      },

      {
        skip: (ctx): boolean => !(ctx.mode === AvailableSchemaModes.MODIFY && !ctx.name),
        task: async (ctx, task): Promise<void> => {
          const projects = readWorkspaceProjects<NxWorkspaceIntegration>(host)

          ctx.name = await task.prompt({
            type: 'AutoComplete',
            message: 'Please select an existing library.',
            choices: Object.entries(projects).reduce((o, [ name, project ]) => {
              if (project.integration?.library) {
                o = [ ...o, name ]
              }

              return o
            }, [] as string[])
          })
        }
      },

      // decide the application root directory
      {
        task: (ctx): void => {
          if (options.directory) {
            ctx.directory = `${names(options.directory).fileName}/${names(ctx.name).fileName}`
          } else {
            ctx.directory = names(ctx.name).fileName
          }
        }
      },

      // normalize package json scope
      {
        title: 'Normalizing package.json project name.',
        task: (ctx, task): void => {
          const nxJson = readNxJson()
          ctx.packageName = `@${nxJson.npmScope}/${ctx.name}`
          ctx.packageScope = `${nxJson.npmScope}`

          task.title = `Project package name set as "${ctx.packageName}".`
        }
      },

      // set project root directory
      {
        title: 'Setting project root directory.',
        task: (ctx, task): void => {
          const layout = readWorkspaceLayout(host)

          ctx.root = normalize(`${layout.libsDir}/${ctx.directory}`)

          task.title = `Project root directory is set as "${ctx.root}".`
        }
      },

      // check for prior configuration
      {
        title: 'Checking if the application is configured before.',
        task: (ctx, task): void => {
          if (directoryExists(ctx.root)) {
            task.output = `Project root directory is not empty at: "${ctx.root}"`

            task.title = 'Looking for prior library configuration.'

            const integration = readNxProjectIntegration<NxWorkspaceIntegration>(host, ctx.name)
            if (integration?.library) {
              ctx.priorConfiguration = integration.library

              task.title = 'Prior configuration successfully read.'
            } else {
              throw new Error('Can not read the prior configuration.')
            }
          } else {
            task.title = 'This is the initial configuration of the package.'
          }
        },
        options: {
          persistentOutput: true,
          bottomBar: false
        }
      },

      // select library type
      {
        skip: (ctx): boolean => !!ctx.type,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableLibraryTypes>(AvailableLibraryTypes, PrettyNamesForAvailableThingies)

          ctx.type = await task.prompt<AvailableLibraryTypes>({
            type: 'Select',
            message: 'Please select the library type.',
            choices,
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableLibraryTypes>(ctx, 'type', choices)
          })

          task.title = `Library type selected as: ${ctx.tests}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // select tests
      {
        skip: (ctx): boolean => !!ctx.tests,
        task: async (ctx, task): Promise<void> => {
          const choices = mapPromptChoices<AvailableTestsTypes>(AvailableTestsTypes, PrettyNamesForAvailableThingies)

          ctx.tests = await task.prompt<AvailableTestsTypes>({
            type: 'Select',
            message: 'Please select the test runner type.',
            choices,
            initial: getInitialFromPriorConfiguration<NormalizedSchema, AvailableTestsTypes>(ctx, 'tests', choices)
          })

          task.title = `Test runner selected as: ${ctx.tests}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      }
    ],
    {
      rendererFallback: isVerbose()
    }
  ).run()
}
