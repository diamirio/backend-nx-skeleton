import { DependencyCalculatorOptions } from './dependency-calculator.interface'
import { PackageVersions } from '@interfaces/versions.interface'
import { deepMerge } from '@webundsoehne/deep-merge'

/**
 * Calculates the dependencies with a given condition, returns the package versions merged.
 * @param options
 */
export function dependencyCalculator (options: DependencyCalculatorOptions): PackageVersions {
  return options.reduce((o, i) => {
    if (i.condition ?? true) {
      o = deepMerge(o, i.deps)
    }

    return o
  }, {})
}
