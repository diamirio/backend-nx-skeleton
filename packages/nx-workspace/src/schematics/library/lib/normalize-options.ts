import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { NxWorkspaceIntegration } from '@integration'
import { AvailableLibraryTypes, PrettyNamesForAvailableThingies } from '@interfaces/available.constants'
import {
  AvailableSchemaModes,
  AvailableTestsTypes,
  getInitialFromPriorConfiguration,
  isVerbose,
  mapPromptChoices,
  normalizePackageJsonNameTask,
  normalizePriorConfigurationTask,
  normalizeRootDirectoryTask,
  NxProjectTypes,
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

      // normalize package json scope
      ...normalizePackageJsonNameTask<NormalizedSchema>(host),

      // set project root directory
      ...normalizeRootDirectoryTask<NormalizedSchema>(host, NxProjectTypes.LIB),

      // check for prior configuration
      ...normalizePriorConfigurationTask<NormalizedSchema, NxWorkspaceIntegration>(host, 'library'),

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

          task.title = `Library type selected as: ${ctx.type}`
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
