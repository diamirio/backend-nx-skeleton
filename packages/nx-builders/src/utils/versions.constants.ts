import { Versions } from './versions.interface'
import { AvailableBuilders } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {},

  [AvailableBuilders.TSC]: {
    devDeps: {
      tscpaths: '^0.0.9',
      'tsc-watch': '^4.4.0'
    }
  },

  [AvailableBuilders.TS_NODE_DEV]: {
    devDeps: {
      'ts-node': '^10.1.0',
      'ts-node-dev': '^1.1.8',
      'tsconfig-paths': '^3.10.1'
    }
  }
}
