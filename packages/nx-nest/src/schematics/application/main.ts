import {
  chain,
  Rule,
  SchematicContext,
  Tree,
  branchAndMerge,
  MergeStrategy,
  mergeWith
} from '@angular-devkit/schematics'
import { addLintFiles, Linter } from '@nrwl/workspace'
import { eslintDeps, eslintJson } from '@utils/lint'
import { formatFiles } from '@webundsoehne/nx-tools'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateIntegration } from './lib/update-integration'
import { updateTsconfigPaths } from './lib/update-tsconfig-json'
import { Schema } from './main.interface'
import init from '@init/init'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([
      init({
        ...options,
        skipFormat: true
      }),
      addProject(options),
      // addLintFiles(options.root, Linter.EsLint, {
        // localConfig: eslintJson,
        // extraPackageDeps: eslintDeps
      // }),
      createApplicationFiles(options),
      updateIntegration(options),
      updateTsconfigPaths(options),
      formatFiles({ eslint: true, prettier: true })
    ])
  }
}