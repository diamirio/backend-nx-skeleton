import { chain, Rule, SchematicContext } from '@angular-devkit/schematics'
import { Tree } from '@nrwl/devkit'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateIntegration } from './lib/update-integration'
import { Schema } from './main.interface'
import { SchematicConstants } from '@src/interfaces'
import { addEslintToTree, eslintJson, formatOrSkip, LINTER_VERSIONS, Logger, runInRule, updateTsconfigPaths } from '@webundsoehne/nx-tools'

export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      runInRule(log.info.bind(log)(`Adding ${SchematicConstants.MICROSERVICE_PROVIDER_PACKAGE} library to workspace.`)),

      addEslintToTree(host, log, options, { deps: LINTER_VERSIONS.eslint, json: eslintJson({ packageScope: options.packageScope, override: {} }) }),

      addProject(host, options),

      runInRule(log.info.bind(log)('Creating application files.')),
      createApplicationFiles(options, context),

      runInRule(log.info.bind(log)('Updating integration.')),
      updateIntegration(host, options),

      runInRule(log.info.bind(log)('Updating tsconfig files.')),
      updateTsconfigPaths(options),

      formatOrSkip(log, schema?.skipFormat, { eslint: true, prettier: true })
    ])
  }
}
