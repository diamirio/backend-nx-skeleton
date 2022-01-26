import { isDevelopmentMode } from '.'
import { DependencyCalculatorOptions } from './dependency-calculator.interface'
import { PackageVersions } from '@interfaces/versions.interface'
import { Logger } from '@utils/logger/logger'
import { deepMerge } from '@webundsoehne/deep-merge'

/**
 * Calculates the dependencies with a given condition, returns the package versions merged.
 * @param options
 */
export function dependencyCalculator (options: DependencyCalculatorOptions): PackageVersions {
  if (isDevelopmentMode()) {
    const logger = new Logger()

    logger.warn('dependencyCalculator is running in development mode.')
    logger.warn('It will use the linked packages if they are available.')

    return options.reduce((o, i) => {
      if (i.condition !== false) {
        o = deepMerge(o, i.deps)
      }

      return o
    }, {})
  } else {
    return options.reduce((o, i) => {
      if (i.condition !== false) {
        o = deepMerge(o, i.deps)
      }

      return o
    }, {})
  }
}
