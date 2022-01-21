import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'
import { LINTER_VERSIONS } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        '@nrwl/cli': '^13.4.6',
        '@nrwl/workspace': '^13.4.6',
        '@nrwl/tao': '^13.4.6',
        '@webundsoehne-private/nx-workspace': '^3.0.0',
        typescript: '^4.5.4',
        '@types/node': '^16',
        dotenv: '^14.2.0',
        prettier: '^2.5.1',
        '@nrwl/jest': '^13.4.6',
        '@nrwl/linter': '^13.4.6',
        'lint-staged': '^11',
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
