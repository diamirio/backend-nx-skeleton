import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain, noop } from '@angular-devkit/schematics'

import { runInRule } from './run.rule'
import type { FormatFilesOptions } from '@utils'
import { Logger, formatFilesRule } from '@utils'

/**
 * Returns a general prettier-eslint format rule for schematics.
 * @param log
 * @param skip
 * @param options
 */
export function formatTreeRule (options?: FormatFilesOptions): Rule {
  return (_host: Tree, context: SchematicContext): Rule => {
    options = {
      skip: false,
      prettier: true,
      eslint: true,
      ...options
    }

    const log = new Logger(context)

    return !options.skip ? chain([ runInRule(log.info.bind(log)('Formatting and linting files.')), formatFilesRule(options) ]) : noop()
  }
}
