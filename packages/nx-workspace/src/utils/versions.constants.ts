import { VERSION_CONSTANTS } from '@webundsoehne/nx-tools'

import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    devDeps: {
      '@nrwl/cli': '^11.4.0',
      '@nrwl/workspace': '^11.4.0',
      '@nrwl/tao': '^11.4.0',
      // '@angular-devkit/core': '^11.0.1',
      '@webundsoehne-private/nx-workspace': '*',
      typescript: '^4.2.2',
      '@types/node': '^14.14.31',
      dotenv: '^8.2.0',
      prettier: '^2.2.1',
      '@nrwl/jest': '^11.4.0',
      '@nrwl/linter': '^11.4.0',
      'lint-staged': '^10.5.4',
      husky: '^4',
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
