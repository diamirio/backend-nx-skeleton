import { LINTER_VERSIONS } from '@webundsoehne/nx-tools'

import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        '@nrwl/cli': '^12.9.0',
        '@nrwl/workspace': '^12.9.0',
        '@nrwl/tao': '^12.9.0',
        // '@angular-devkit/core': '^11.0.1',
        '@webundsoehne-private/nx-workspace': '^3.0.0',
        typescript: '^4.4.3',
        '@types/node': '^16.9.1',
        dotenv: '^10.0.0',
        prettier: '^2.4.0',
        '@nrwl/jest': '^12.9.0',
        '@nrwl/linter': '^12.9.0',
        'lint-staged': '^11.1.2',
        'simple-git-hooks': '^2.6.1',
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
