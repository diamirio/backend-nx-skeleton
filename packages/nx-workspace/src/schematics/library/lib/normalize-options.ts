import type { SchematicContext, Tree } from '@angular-devkit/schematics'

import type { NormalizedSchema, Schema } from '../main.interface'
import type { NxWorkspaceIntegration } from '@integration'
import { AvailableLibraryTypes, PrettyNamesForAvailableThingies } from '@interfaces/available.constants'
import {
  AvailableTestsTypes,
  ensureNxRootListrTask,
  getInitialFromPriorConfiguration,
  Manager,
  mapPromptChoices,
  normalizeNameWithApplicationModePrompt,
  normalizePackageJsonNamePrompt,
  normalizePriorConfigurationPrompt,
  normalizeRootDirectoryPrompt,
  NxProjectTypes,
  setSchemaDefaultsInContext
} from '@webundsoehne/nx-tools'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Manager(context).run<NormalizedSchema>([
    // assign options to parsed schema
    {
      task: (ctx): void => {
        setSchemaDefaultsInContext(ctx, {
          default: [
            options,
            {
              sourceRoot: 'src'
            },
            {
              enum: {
                type: AvailableLibraryTypes,
                tests: AvailableTestsTypes
              }
            }
          ]
        })
      }
    },

    ...ensureNxRootListrTask(),

    // select generator mode
    ...normalizeNameWithApplicationModePrompt<NormalizedSchema, NxWorkspaceIntegration>(host, (_, project) => !!project.integration?.library),

    // normalize package json scope
    ...normalizePackageJsonNamePrompt<NormalizedSchema>(host),

    // set project root directory
    ...normalizeRootDirectoryPrompt<NormalizedSchema>(host, NxProjectTypes.LIB),

    // check for prior configuration
    ...normalizePriorConfigurationPrompt<NormalizedSchema, NxWorkspaceIntegration>(host, 'library'),

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
  ])
}
