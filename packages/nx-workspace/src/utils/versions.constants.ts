import { VERSION_CONSTANTS } from '@webundsoehne/nx-tools'

import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    devDeps: {
      '@nrwl/cli': '^10.4.0',
      '@nrwl/workspace': '^10.4.0',
      '@nrwl/tao': '^10.4.0',
      // '@angular-devkit/core': '^11.0.1',
      '@webundsoehne-private/nx-workspace': '*',
      typescript: '^4.0.5',
      '@types/node': '^14.14.7',
      dotenv: '^8.2.0',
      prettier: '^2.1.2',
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
