import type { DependencyCalculatorOptions } from './dependency-calculator.interface'
import { isDevelopmentMode } from './is-development-mode'
import type { DependencyCalculatorDependency, DependencyCalculatorPackage, PackageVersions } from '@interfaces/versions.interface'
import { Logger } from '@utils/logger/logger'
import type { LocalNodeModule } from '@utils/package-manager'
import { PackageManager } from '@utils/package-manager'
import { ArrayMergeBehavior, merge } from '@webundsoehne/deep-merge'

/**
 * Calculates the dependencies with a given condition, returns the package versions merged.
 */
export async function dependencyCalculator (options: DependencyCalculatorOptions): Promise<PackageVersions> {
  if (isDevelopmentMode()) {
    const logger = new Logger()
    const packageManager = new PackageManager()

    logger.warn('dependencyCalculator is running in development mode.')
    logger.warn('It will use the linked packages if they are available.')

    const deps = options.flatMap((pkg) =>
      Object.values(pkg.deps).flatMap((v: DependencyCalculatorDependency) =>
        Object.entries(v).map(([key, value]) => {
          if (typeof value === 'string') {
            return {
              pkg: key,
              version: value
            }
          }

          return {
            pkg: key,
            ...value
          }
        })
      )
    )

    const linked = await packageManager.checkIfModuleInstalled(deps, { onlyLinked: true })

    return options.reduce<PackageVersions>((o, i) => {
      if (i.condition === false) {
        return o
      }

      const d = convertDependencyCalculatorPackage(i.deps)

      const linkedPackages = useLinkedVersionOfDependencies(linked, d)

      if (Object.values(linkedPackages).some((item) => Object.keys(item).length > 0)) {
        logger.debug('Using linked dependencies for: %o', linkedPackages)
      }

      o = merge({ arrayMerge: ArrayMergeBehavior.UNIQUE }, o, d, linkedPackages)

      return o
    }, {})
  }

  return options.reduce<PackageVersions>((o, i) => {
    if (i.condition !== false) {
      o = merge({ arrayMerge: ArrayMergeBehavior.UNIQUE }, o, convertDependencyCalculatorPackage(i.deps))
    }

    return o
  }, {})
}

/**
 * Reorders the package dependencies to move out the implicit ones in to a separate array.
 */
export function convertDependencyCalculatorPackage (deps: DependencyCalculatorPackage): PackageVersions {
  const implicitDeps: PackageVersions['implicitDeps'] = []

  const parsedDeps = Object.fromEntries(
    Object.entries(deps).map(([key, value]) => {
      return [
        key,

        Object.entries(value).reduce((o, [dep, details]) => {
          if (typeof details === 'string') {
            return { ...o, [dep]: details }
          } else {
            if ((details as DependencyCalculatorDependency).implicit) {
              implicitDeps.push(dep)
            }

            return { ...o, [dep]: (details as DependencyCalculatorDependency).version }
          }
        }, {})
      ]
    })
  )

  parsedDeps.implicitDeps = implicitDeps

  return parsedDeps
}

/**
 * Use linked versions of the given packages if they are available. This is used for the development mode to not link the packages manually on updates.
 */
export function useLinkedVersionOfDependencies (linked: LocalNodeModule[], deps: PackageVersions): PackageVersions {
  return Object.fromEntries(
    Object.entries(deps).map(([key, value]) => {
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
