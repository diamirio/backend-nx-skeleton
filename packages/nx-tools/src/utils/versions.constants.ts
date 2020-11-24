import { VersionConstants } from './versions.interface'

/**
 * Version constants that is shared through multiple places.
 */
export const VERSION_CONSTANTS: VersionConstants = {
  eslint: {
    dependencies: {},
    devDependencies: {
      eslint: '^7.13.0',
      '@nrwl/eslint-plugin-nx': '^10.4.1',
      '@webundsoehne/eslint-config': '*',
      '@typescript-eslint/eslint-plugin': '^4.7.0',
      'eslint-plugin-import': '^2.22.1'
    }
  }
}
