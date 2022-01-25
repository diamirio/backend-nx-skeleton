import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { normalizeNameWithParentAndDestinationTask, normalizePackageJsonNameForParentTask, readProjectConfiguration, setSchemaDefaultsInContext } from '@webundsoehne/nx-tools'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (host: Tree, _context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>([
    // assign options to parsed schema
    {
      task: (ctx): void => {
        setSchemaDefaultsInContext(ctx, {
          default: [ options ]
        })
      }
    },

    ...normalizeNameWithParentAndDestinationTask<NormalizedSchema, never>(host),

    ...normalizePackageJsonNameForParentTask<NormalizedSchema>(host),

    {
      task: async (ctx): Promise<void> => {
        ctx.project = readProjectConfiguration(host, ctx.parent)
      }
    }
  ]).run()
}
