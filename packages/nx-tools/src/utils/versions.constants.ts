import { VersionConstants } from './versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const VERSION_CONSTANTS: VersionConstants = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^7.21.0',
      '@nrwl/eslint-plugin-nx': '^11.4.0',
      '@webundsoehne/eslint-config': '*',
      '@typescript-eslint/eslint-plugin': '^4.16.1',
      'eslint-plugin-import': '^2.22.1'
    }
  }
}
