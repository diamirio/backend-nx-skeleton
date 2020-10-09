import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { formatOrSkip, Logger, runInRule } from '@webundsoehne/nx-tools'

import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'

/**
 * @param  {Schema} schema
 * The schematic itself.
 */
export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      runInRule(log.info.bind(log), `Creating "${options.type}" component files: ${options.name}@${options.root}`, !schema.silent),
      await createApplicationFiles(options, context),

      formatOrSkip(log, schema.skipFormat, { eslint: true, prettier: true })
    ])
  }
}
