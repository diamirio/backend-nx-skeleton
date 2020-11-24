import { SchematicContext, Tree } from '@angular-devkit/schematics'
import { Listr } from 'listr2'

import { NormalizedSchema, Schema } from '../main.interface'
import { isVerbose, setSchemaDefaultsInContext } from '@utils'

/**
 * Normalize options for the schematic.
 * @param host
 * @param context
 * @param options
 */
export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: (ctx): void => {
          setSchemaDefaultsInContext(ctx, { assign: { from: options, keys: [ 'templates' ] } })
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: isVerbose(),
      rendererSilent: options.silent
    }
  ).run()
}
