import type { SchematicContext, Tree } from '@angular-devkit/schematics'

import type { NormalizedSchema, Schema } from '../main.interface'
import {
  ensureNxRootListrTask,
  Manager,
  normalizePackageJsonNameForParentPrompt,
  normalizeParentApplicationPrompt,
  normalizeParentConfigurationPrompt,
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
          default: [options]
        })
      }
    },

    ...ensureNxRootListrTask(),

    ...normalizeParentApplicationPrompt<NormalizedSchema, never>(host),

    ...normalizeParentConfigurationPrompt<NormalizedSchema>(host),

    ...normalizePackageJsonNameForParentPrompt<NormalizedSchema>(host)
  ])
}
