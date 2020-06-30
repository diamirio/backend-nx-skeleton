import {
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics'
import { addLintFiles, getWorkspacePath, Linter } from '@nrwl/workspace'
import { eslintDeps, eslintJson } from '@utils/lint'
import execa from 'execa'
import { join } from 'path'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateNxJson } from './lib/update-nx-json'
import { updateTsconfigPaths } from './lib/update-tsconfig-json'
import { Schema } from './main.interface'
import init from '@init/init'

export default function (schema: Schema): Rule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, schema)

    return chain([
      init({
        ...options,
        skipFormat: true
      }),
      addProject(options),
      addLintFiles(options.root, Linter.EsLint, {
        localConfig: eslintJson,
        extraPackageDeps: eslintDeps
      }),
      createApplicationFiles(options),
      updateNxJson(options),
      updateTsconfigPaths(options)
    ])
  }
}