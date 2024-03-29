import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import type { Schema } from './main.interface'
import { formatTreeRule, runInRule } from '@rules'
import { Logger } from '@utils'

/**
 * @param  {Schema} schema
 * The schematic itself.
 */
export function generateGenericGenerator (files: string) {
  return function (schema: Schema): Rule {
    return async (host: Tree, context: SchematicContext): Promise<Rule> => {
      const log = new Logger(context)
      const options = await normalizeOptions(host, context, schema, files)

      return chain([
        runInRule(log.info.bind(log)('Generating "%s" files: %s@%s', options.type, options.name, options.root), !schema.silent),
        createApplicationFiles(files, options),

        formatTreeRule({ skip: options.skipFormat })
      ])
    }
  }
}
