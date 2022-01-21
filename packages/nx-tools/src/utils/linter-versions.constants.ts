import { LinterVersions } from './linter-versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const LINTER_VERSIONS: LinterVersions = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^8.7.0',
      '@nrwl/eslint-plugin-nx': '^13.4.6',
      '@webundsoehne/eslint-config': '^4.0.0',
      '@typescript-eslint/eslint-plugin': '^5.10.0',
      'eslint-plugin-import': '^2.25.4'
    }
  }
}
