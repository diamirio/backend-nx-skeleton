import { chain, Rule } from '@angular-devkit/schematics'
import { Tree } from '@nrwl/devkit'
import { addLintFiles, Linter } from '@nrwl/workspace'

import { runInRule } from '@rules/run.rule'
import { Logger } from '@utils'

/**
 * Adding eslint to workspace
 * @param  {Tree} host
 * @param  {Logger} log
 * @param  {T} options
 * @param  {{json:any} eslint
 * @param  {any}} deps
 * @returns Rule
 */
export function addEslintToTree<T extends { root: string }> (host: Tree, log: Logger, options: T, eslint: { json: any, deps: any }): Rule {
  return chain([
    !host.exists(`${options.root}/.eslintrc`) && !host.exists(`${options.root}/.eslintrc.json`)
      ? chain([
        runInRule(log.info.bind(log)('Adding eslint configuration.')),

        addLintFiles(options.root, Linter.EsLint, {
          localConfig: eslint.json,
          extraPackageDeps: eslint.deps
        })
      ])
      : runInRule(log.warn.bind(log)('Skipping since eslint configuration already exists.'))
  ])
}
