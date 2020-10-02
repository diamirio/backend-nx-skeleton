import { chain, Rule, Tree } from '@angular-devkit/schematics'
import { addLintFiles, Linter } from '@nrwl/workspace'

import { Logger } from '@utils/logger'
import { runInRule } from '@utils/run-in-rule'

export function addEslintToWorkspace<T extends { root: string }> (host: Tree, log: Logger, options: T, eslint: { json: any, deps: any }): Rule {
  return chain([
    !host.exists(`${options.root}/.eslintrc`)
      ? chain([
        runInRule(log.info.bind(log), 'Adding eslint configuration.'),

        addLintFiles(options.root, Linter.EsLint, {
          localConfig: eslint.json,
          extraPackageDeps: eslint.deps
        })
      ])
      : runInRule(log.warn.bind(log), 'Skipping since eslint configuration already exists.')
  ])
}
