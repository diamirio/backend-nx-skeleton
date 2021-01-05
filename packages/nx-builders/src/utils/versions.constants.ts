import { Versions } from './versions.interface'
import { AvailableBuilders } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    default: {
      devDeps: {
        // already in workspace
        // typescript: '^4.0.5'
      }
    }
  },

  [AvailableBuilders.TSC]: {
    devDeps: {
      tscpaths: '^0.0.9',
      'tsc-watch': '^4.2.9'
    }
  },

  [AvailableBuilders.TS_NODE_DEV]: {
    devDeps: {
      'ts-node': '^9.1.1',
      'ts-node-dev': '^1.1.1',
      'tsconfig-paths': '^3.9.0'
    }
  }
}
