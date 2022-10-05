import type { LinterVersions } from './linter-versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const LINTER_VERSIONS: LinterVersions = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^8',
      ['@nrwl/eslint-plugin-nx']: '^14',
      ['@webundsoehne/eslint-config']: '^5',
      ['@typescript-eslint/eslint-plugin']: '^5',
      ['@typescript-eslint/parser']: '^5',
      ['eslint-plugin-import']: '^2',
      ['eslint-module-utils']: '^2'
    }
  }
}
