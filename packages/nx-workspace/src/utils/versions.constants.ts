import { Versions } from './versions.interface'
import { AvailableCLIs } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    devDeps: {
      'nrwl-workspace': '^10.0.12',
      typescript: '^3.9.0'
    }
  },

  [AvailableCLIs.NX]: {
    devDeps: {
      test: '1.0.0'
    }
  },

  [AvailableCLIs.ANGULAR]: {
    devDeps: {
      'ts-node': '^8.10.0',
      'ts-node-dev': '^1.0.0',
      'tsconfig-paths': '^3.9.0'
    }
  }
}
