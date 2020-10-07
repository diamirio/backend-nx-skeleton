import { chain, noop, Rule } from '@angular-devkit/schematics'

import { runInRule } from './run.rule'
import { formatFiles, FormatFilesOptions } from '@utils/index'
import { Logger } from '@utils/logger/logger'

export function formatOrSkip (log: Logger, skip?: boolean, options: FormatFilesOptions = { eslint: true, prettier: true }): Rule {
  return skip ? chain([ runInRule(log.info.bind(log), 'Formatting and linting files.'), formatFiles(options) ]) : noop()
}
