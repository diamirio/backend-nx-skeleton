import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import { runInRule } from './run.rule'
import type { FormatFilesOptions } from '@utils'
import { formatFilesRule, Logger } from '@utils'

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

    return options.skip === true
      ? chain([runInRule(log.debug.bind(log)('Ignoring to format and lint files, since skip is set: %o', options))])
      : chain([runInRule(log.info.bind(log)('Formatting and linting files.')), formatFilesRule(options)])
  }
}
