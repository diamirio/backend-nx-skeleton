import { Versions } from './versions.interface'
import { AvailableBuilders } from '@interfaces/index'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        'nrwl-workspace': '^10.0.12',
        typescript: '^3.9.0'
      }
    }
  },

  [AvailableBuilders.TSC]: {
    devDeps: {
      tscpaths: '^0.0.9',
      'tsc-watch': '^4.2.0'
    }
  },

  [AvailableBuilders.TS_NODE_DEV]: {
    devDeps: {
      'ts-node': '^8.10.0',
      'ts-node-dev': '^1.0.0',
      'tsconfig-paths': '^3.9.0'
    }
  }
}
