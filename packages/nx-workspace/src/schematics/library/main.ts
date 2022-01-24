import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateIntegration } from './lib/update-integration'
import { Schema } from './main.interface'
import { addEslintConfigRule, eslintJson, formatTreeRule, LINTER_VERSIONS, Logger, runInRule, SchematicRule, updateTsConfigPathsRule } from '@webundsoehne/nx-tools'

/**
 * Entrypoint to the schematic.
 * @param schema
 */
export default function (schema: Schema): SchematicRule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      addEslintConfigRule(options, { deps: LINTER_VERSIONS.eslint, json: eslintJson({ packageScope: options.packageScope }) }),

      runInRule(log.info.bind(log)('Adding project to workspace.')),
      addProject(options),

      runInRule(log.info.bind(log)('Creating library files.')),
      createApplicationFiles(options),

      runInRule(log.info.bind(log)('Updating tsconfig files.')),
      updateTsConfigPathsRule(options),

      runInRule(log.info.bind(log)('Updating integration.')),
      updateIntegration(options),

      formatTreeRule({ skip: options.skipFormat })
    ])
  }
}
