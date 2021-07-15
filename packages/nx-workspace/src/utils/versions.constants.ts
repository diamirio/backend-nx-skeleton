import { LINTER_VERSIONS } from '@webundsoehne/nx-tools'

import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        '@nrwl/cli': '^12.5.8',
        '@nrwl/workspace': '^12.5.8',
        '@nrwl/tao': '^12.5.8',
        // '@angular-devkit/core': '^11.0.1',
        '@webundsoehne-private/nx-workspace': '^2.0.12',
        typescript: '^4.3.5',
        '@types/node': '^16.3.2',
        dotenv: '^10.0.0',
        prettier: '^2.3.2',
        '@nrwl/jest': '^12.5.8',
        '@nrwl/linter': '^12.5.8',
        'lint-staged': '^11.0.1',
        'husky-v4': '^4.3.8',
        ...LINTER_VERSIONS.eslint.dependencies,
        ...LINTER_VERSIONS.eslint.devDependencies
      }
    }
  },

  [AvailableCLIs.NX]: {
    devDeps: {}
  },

  [AvailableCLIs.ANGULAR]: {
    devDeps: {}
  }
}
