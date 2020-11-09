import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { Logger, runInRule, formatOrSkip } from '@webundsoehne/nx-tools'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'

/**
 * Entrypoint to the schematic.
 * @param schema
 */
export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      runInRule(log.info.bind(log)('Creating a new workspace.')),
      addProject(options),

      runInRule(log.info.bind(log)('Creating application files.')),
      createApplicationFiles(options, context),

      formatOrSkip(log, false, { eslint: true, prettier: true })
    ])
  }
}
