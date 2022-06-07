import type { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'
import { LINTER_VERSIONS } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        ['@nrwl/cli']: '^14.1.9',
        ['@nrwl/workspace']: '^14.1.9',
        ['@nrwl/tao']: '^14.1.9',
        ['@angular-devkit/architect']: '^0.1400.0',
        ['@angular-devkit/core']: '^14.0.0',
        ['@angular-devkit/schematics']: '^14.0.0',
        ['@webundsoehne-private/nx-workspace']: '^5.0.0',
        ['@webundsoehne/nx-tools']: '^6.0.0',
        typescript: '^4.7.3',
        ['@types/node']: '^16',
        dotenv: '^16.0.1',
        prettier: '^2.6.2',
        ['@nrwl/jest']: '^14.1.9',
        ['@nrwl/linter']: '^14.1.9',
        ['lint-staged']: '^13',
        ['simple-git-hooks']: '^2.8.0',
        ...LINTER_VERSIONS.eslint.dependencies,
        ...LINTER_VERSIONS.eslint.devDependencies
      }
    }
  },

  [AvailableCLIs.NX]: {
    devDeps: {}
  }
}
