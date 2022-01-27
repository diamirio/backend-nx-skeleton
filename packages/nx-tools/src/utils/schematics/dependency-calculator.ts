import { DependencyCalculatorOptions } from './dependency-calculator.interface'
import { isDevelopmentMode } from './is-development-mode'
import { PackageVersions } from '@interfaces/versions.interface'
import { Logger } from '@utils/logger/logger'
import { LocalNodeModule, PackageManager } from '@utils/package-manager'
import { deepMerge } from '@webundsoehne/deep-merge'

/**
 * Calculates the dependencies with a given condition, returns the package versions merged.
 * @param options
 */
export async function dependencyCalculator (options: DependencyCalculatorOptions): Promise<PackageVersions> {
  if (isDevelopmentMode()) {
    const logger = new Logger()
    const packageManager = new PackageManager()

    logger.warn('dependencyCalculator is running in development mode.')
    logger.warn('It will use the linked packages if they are available.')
    logger.warn('Development mode can be much slower due to additional operations.')

    const deps = options.flatMap((pkg) => Object.values(pkg.deps).flatMap((v) => Object.keys(v)))

    logger.debug('%o', deps)

    const linked = await packageManager.checkIfModuleInstalled(deps, { onlyLinked: true })

    return options.reduce((o, i) => {
      if (i.condition !== false) {
        const linkedPackages = useLinkedVersionOfDependencies(linked, i.deps)

        if (Object.values(linkedPackages).some((item) => Object.keys(item).length > 0)) {
          logger.debug('Using linked dependencies for: %o', linkedPackages)
        }

        o = deepMerge(o, i.deps, linkedPackages)
      }

      return o
    }, {})
  }

  return options.reduce((o, i) => {
    if (i.condition !== false) {
      o = deepMerge(o, i.deps)
    }

    return o
  }, {})
}

export function useLinkedVersionOfDependencies (linked: LocalNodeModule[], deps: PackageVersions): PackageVersions {
  return Object.fromEntries(
    Object.entries(deps).map(([ key, value ]) => {
      return [
        key,

        Object.keys(value).reduce((o, dep) => {
          const pkg = linked.find((pkg) => pkg.linked && pkg.pkg === dep)

          if (pkg) {
            return {
              ...o,
              [dep]: pkg.path
            }
          }

          return o
        }, {})
      ]
    })
  )
}
