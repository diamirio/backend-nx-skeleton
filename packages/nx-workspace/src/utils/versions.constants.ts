import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'
import { LINTER_VERSIONS } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        '@nrwl/cli': '^13.2.2',
        '@nrwl/workspace': '^13.2.2',
        '@nrwl/tao': '^13.2.2',
        // '@angular-devkit/core': '^11.0.1',
        '@webundsoehne-private/nx-workspace': '^3.0.0',
        typescript: '^4.5.2',
        '@types/node': '^16.11.10',
        dotenv: '^10.0.0',
        prettier: '^2.4.1',
        '@nrwl/jest': '^13.2.2',
        '@nrwl/linter': '^13.2.2',
        'lint-staged': '^11.2.6',
        'simple-git-hooks': '^2.7.0',
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
