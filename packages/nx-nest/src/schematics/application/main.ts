import {
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics'
import { addLintFiles, formatFiles } from '@nrwl/workspace'

import { eslintDeps, eslintJson } from '../../utils/lint'
import init from '../init/main'
import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { setDefaults } from './lib/set-defaults'
import { updateNxJson } from './lib/update-nx-json'
import { Schema } from './schema'

export default function (schema: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const options = normalizeOptions(host, schema)
    return chain([
      init({
        ...options,
        skipFormat: true
      }),
      addLintFiles(options.appProjectRoot, options.linter, {
        localConfig: eslintJson,
        extraPackageDeps: eslintDeps
      }),
      createApplicationFiles(options),
      updateNxJson(options),
      addProject(options),
      setDefaults(options),
      formatFiles(options)
    ])
  }
}