import type { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import type { NormalizedSchema, Schema } from '../main.interface'
import type { NxNestProjectIntegration } from '@integration'
import { SchematicConstants } from '@interfaces'
import {
  ensureNxRootListrTask,
  isVerbose,
  normalizeNamePrompt,
  normalizePackageJsonNamePrompt,
  normalizePriorConfigurationPrompt,
  normalizeRootDirectoryPrompt,
  NxProjectTypes,
  setSchemaDefaultsInContext
} from '@webundsoehne/nx-tools'

export async function normalizeOptions (host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: async (ctx): Promise<void> => {
          setSchemaDefaultsInContext(ctx, {
            default: [
              options,
              {
                sourceRoot: 'src',
                name: SchematicConstants.BACKEND_INTERFACES_PACKAGE,
                constants: SchematicConstants
              }
            ]
          })
        }
      },

      ...ensureNxRootListrTask(),

      // select application name
      ...normalizeNamePrompt<NormalizedSchema>(),

      // normalize package json scope
      ...normalizePackageJsonNamePrompt<NormalizedSchema>(host),

      // set project root directory
      ...normalizeRootDirectoryPrompt<NormalizedSchema>(host, NxProjectTypes.LIB),

      // check for prior configuration
      ...normalizePriorConfigurationPrompt<NormalizedSchema, NxNestProjectIntegration>(host, 'backendInterfaces')
    ],
    {
      concurrent: false,
      rendererFallback: isVerbose(),
      rendererSilent: options.silent
    }
  ).run()
}
