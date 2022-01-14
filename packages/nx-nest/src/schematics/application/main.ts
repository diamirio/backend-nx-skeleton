import { chain, Rule, SchematicContext } from '@angular-devkit/schematics'
import { Tree } from '@nrwl/devkit'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateIntegration } from './lib/update-integration'
import { Schema } from './main.interface'
import init from '@src/schematics/init/main'
import { eslintJson, addEslintToTree, formatOrSkip, Logger, runInRule, updateTsconfigPaths, LINTER_VERSIONS } from '@webundsoehne/nx-tools'

/**
 * Entrypoint to the schematic.
 * @param schema
 */
export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      runInRule(log.info.bind(log)('Initiating workspace.')),
      init({
        ...options,
        skipFormat: true
      }),

      addEslintToTree(host, log, options, { deps: LINTER_VERSIONS.eslint, json: eslintJson({ packageScope: options.packageScope, override: {} }) }),

      runInRule(log.info.bind(log)('Adding project to workspace.')),
      addProject(host, options),

      runInRule(log.info.bind(log)('Creating application files.')),
      createApplicationFiles(options, context),

      runInRule(log.info.bind(log)('Updating integration.')),
      updateIntegration(host, options),

      runInRule(log.info.bind(log)('Updating tsconfig files.')),
      updateTsconfigPaths(options),

      formatOrSkip(log, schema.skipFormat, { eslint: true, prettier: true })
    ])
  }
}
