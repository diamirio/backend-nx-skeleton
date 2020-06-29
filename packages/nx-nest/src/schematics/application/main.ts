import {
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics'
import { addLintFiles, formatFiles } from '@nrwl/workspace'
import { eslintDeps, eslintJson } from '@utils/lint'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateNxJson } from './lib/update-nx-json'
import { Schema } from './schema'
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
      addLintFiles(options.root, options.linter, {
        localConfig: eslintJson,
        extraPackageDeps: eslintDeps
      }),
      createApplicationFiles(options),
      updateNxJson(options),
      formatFiles(options)
    ])
  }
}