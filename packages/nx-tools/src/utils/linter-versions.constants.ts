import { LinterVersions } from './linter-versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const LINTER_VERSIONS: LinterVersions = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^7.32.0',
      '@nrwl/eslint-plugin-nx': '^12.9.0',
      '@webundsoehne/eslint-config': '^4.0.0',
      '@typescript-eslint/eslint-plugin': '^4.31.1',
      'eslint-plugin-import': '^2.24.2'
    }
  }
}
