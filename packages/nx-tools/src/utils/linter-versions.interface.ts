// import { PackageVersions } from '@interfaces/versions.interface'

import type { LinterDependencies } from '@interfaces/linter-dependencies.interface'

/**
 * Version constants that is shared through multiple places.
 */
// this one is different
export type LinterVersions = Record<'eslint', LinterDependencies>
