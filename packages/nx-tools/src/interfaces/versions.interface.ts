import type { CommonNodeDependency } from '@utils/package-manager'

export type DependencyCalculatorDependency = Record<string, string | (Omit<CommonNodeDependency, 'pkg'> & { implicit?: boolean })>
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
  deps?: DependencyCalculatorDependency
  devDeps?: DependencyCalculatorDependency
}

/**
 * For defining a version constant object that is used to install dependencies.
 */
export type VersionsMap<T extends PropertyKey, K extends PropertyKey> = Record<'base', Record<K, DependencyCalculatorPackage>> & Partial<Record<T, DependencyCalculatorPackage>>
