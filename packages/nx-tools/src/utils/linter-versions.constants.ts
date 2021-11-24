import { LinterVersions } from './linter-versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const LINTER_VERSIONS: LinterVersions = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^8.3.0',
      '@nrwl/eslint-plugin-nx': '^13.2.2',
      '@webundsoehne/eslint-config': '^4.0.0',
      '@typescript-eslint/eslint-plugin': '^5.4.0',
      'eslint-plugin-import': '^2.25.3'
    }
  }
}
