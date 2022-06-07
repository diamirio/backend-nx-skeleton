import type { LinterVersions } from './linter-versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const LINTER_VERSIONS: LinterVersions = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^8.17.0',
      ['@nrwl/eslint-plugin-nx']: '^14.1.9',
      ['@webundsoehne/eslint-config']: '^5.2.2',
      ['@typescript-eslint/eslint-plugin']: '^5.27.1',
      ['@typescript-eslint/parser']: '^5.27.1',
      ['eslint-plugin-import']: '^2.26.0',
      ['eslint-module-utils']: '^2.7.3'
    }
  }
}
