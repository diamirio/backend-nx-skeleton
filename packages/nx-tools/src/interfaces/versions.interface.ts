export type Dependency = Record<string, string | { version: string, implicit?: boolean }>
export type ImplicitDependencies = string[]

/**
 * Versions for npm packages.
 */
export interface PackageVersions {
  deps?: Record<string, string>
  devDeps?: Record<string, string>
  implicitDeps?: ImplicitDependencies
}

export interface DependencyCalculatorPackage {
  deps?: Dependency
  devDeps?: Dependency
}

/**
 * For defining a version constant object that is used to install dependencies.
 */
export type VersionsMap<T extends PropertyKey, K extends PropertyKey> = Record<'base', Record<K, DependencyCalculatorPackage>> & Partial<Record<T, DependencyCalculatorPackage>>
