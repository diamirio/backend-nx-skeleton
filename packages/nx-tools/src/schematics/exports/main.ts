import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import type { Schema } from './main.interface'
import { formatTreeRule } from '@rules/format-with-skip.rule'

/**
 * Default entrypoint for the schematic.
 * @param schema
 */
export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([ createApplicationFiles(options), formatTreeRule({ skip: options.skipFormat }) ])
  }
}
