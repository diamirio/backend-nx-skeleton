import type { SchematicContext, Tree } from '@angular-devkit/schematics'

import type { NormalizedSchema, Schema } from '../main.interface'
import { Manager } from '@utils'
import { setSchemaDefaultsInContext } from '@utils/schematics'

/**
 * Normalize the options passed in through angular-schematics.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (_host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Manager(context).run<NormalizedSchema>([
    // assign options to parsed schema
    {
      task: (ctx): void => {
        setSchemaDefaultsInContext(ctx, {
          default: [options, { root: process.cwd() }]
        })
      }
    }
  ])
}
