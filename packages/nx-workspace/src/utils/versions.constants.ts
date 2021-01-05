import { VERSION_CONSTANTS } from '@webundsoehne/nx-tools'

import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    devDeps: {
      '@nrwl/cli': '^11.0.20',
      '@nrwl/workspace': '^11.0.20',
      '@nrwl/tao': '^11.0.20',
      // '@angular-devkit/core': '^11.0.1',
      '@webundsoehne-private/nx-workspace': '*',
      typescript: '^4.1.3',
      '@types/node': '^14.14.20',
      dotenv: '^8.2.0',
      prettier: '^2.2.1',
      '@nrwl/jest': '^11.0.20',
      '@nrwl/linter': '^11.0.20',
      'lint-staged': '^10.5.3',
      ...VERSION_CONSTANTS.eslint.dependencies,
      ...VERSION_CONSTANTS.eslint.devDependencies
    }
  },

  [AvailableCLIs.NX]: {
    devDeps: {}
  },

  [AvailableCLIs.ANGULAR]: {
    devDeps: {}
  }
}
