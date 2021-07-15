/**
 * Versions for npm packages.
 */
export interface PackageVersions {
  deps?: Record<string, string>
  devDeps?: Record<string, string>
}

/**
 * For defining a version constant object that is used to install dependencies.
 */
export type VersionsMap<T extends PropertyKey, K extends PropertyKey> = Record<'base', Record<K, PackageVersions>> & Partial<Record<T, PackageVersions>>
