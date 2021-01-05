import { VersionConstants } from './versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const VERSION_CONSTANTS: VersionConstants = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^7.17.0',
      '@nrwl/eslint-plugin-nx': '^11.0.20',
      '@webundsoehne/eslint-config': '*',
      '@typescript-eslint/eslint-plugin': '^4.12.0',
      'eslint-plugin-import': '^2.22.1'
    }
  }
}
