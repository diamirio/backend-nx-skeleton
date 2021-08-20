import { LINTER_VERSIONS } from '@webundsoehne/nx-tools'

import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        '@nrwl/cli': '^12.7.2',
        '@nrwl/workspace': '^12.7.2',
        '@nrwl/tao': '^12.7.2',
        // '@angular-devkit/core': '^11.0.1',
        '@webundsoehne-private/nx-workspace': '^3.0.0',
        typescript: '^4.3.5',
        '@types/node': '^16.6.2',
        dotenv: '^10.0.0',
        prettier: '^2.3.2',
        '@nrwl/jest': '^12.7.2',
        '@nrwl/linter': '^12.7.2',
        'lint-staged': '^11.1.2',
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
