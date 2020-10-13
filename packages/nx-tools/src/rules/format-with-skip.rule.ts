import { chain, noop, Rule } from '@angular-devkit/schematics'

import { runInRule } from './run.rule'
import { Logger, formatFiles, FormatFilesOptions } from '@utils'

/**
 * Returns a general prettier-eslint format rule for schematics.
 * @param log
 * @param skip
 * @param options
 */
export function formatOrSkip (log: Logger, skip?: boolean, options: FormatFilesOptions = { eslint: true, prettier: true }): Rule {
  return !skip ? chain([ runInRule(log.info.bind(log)('Formatting and linting files.')), formatFiles(options) ]) : noop()
}
