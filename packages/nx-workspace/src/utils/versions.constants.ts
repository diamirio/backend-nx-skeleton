import type { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'
import { LINTER_VERSIONS } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        ['@nrwl/cli']: '^14',
        ['@nrwl/workspace']: '^14',
        ['@nrwl/tao']: '^14',
        ['@angular-devkit/architect']: '^0.1401.1',
        ['@angular-devkit/core']: '^14.1.1',
        ['@angular-devkit/schematics']: '^14.1.1',
        ['@webundsoehne-private/nx-workspace']: '^5.0.0',
        ['@webundsoehne/nx-tools']: '^6',
        typescript: '^4.7.4',
        ['@types/node']: '^16',
        dotenv: '^16.0.1',
        prettier: '^2.7.1',
        ['@nrwl/jest']: '^14',
        ['@nrwl/linter']: '^14',
        ['lint-staged']: '^13',
        ['simple-git-hooks']: '^2',
        ...LINTER_VERSIONS.eslint.dependencies,
        ...LINTER_VERSIONS.eslint.devDependencies
      }
    }
  },

  [AvailableCLIs.NX]: {
    devDeps: {}
  }
}
