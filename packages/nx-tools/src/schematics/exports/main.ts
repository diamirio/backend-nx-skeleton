import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { formatOrSkip } from '@rules/format-with-skip.rule'
import { Logger } from '@utils'

/**
 * Default entrypoint for the schematic.
 * @param schema
 */
export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([ await createApplicationFiles(options), formatOrSkip(log, schema.skipFormat, { eslint: true, prettier: true }) ])
  }
}
