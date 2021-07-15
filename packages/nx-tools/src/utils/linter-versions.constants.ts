import { LinterVersions } from './linter-versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const LINTER_VERSIONS: LinterVersions = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^7.30.0',
      '@nrwl/eslint-plugin-nx': '^12.5.8',
      '@webundsoehne/eslint-config': '^3.0.2',
      '@typescript-eslint/eslint-plugin': '^4.28.3',
      'eslint-plugin-import': '^2.23.4'
    }
  }
}
