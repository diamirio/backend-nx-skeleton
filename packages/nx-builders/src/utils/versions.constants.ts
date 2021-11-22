import { Versions } from './versions.interface'
import { AvailableBuilders } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {},

  [AvailableBuilders.TSC]: {
    devDeps: {
      'tsconfig-replace-paths': '^0.0.11',
      'tsc-watch': '^4.5.0'
    }
  },

  [AvailableBuilders.TS_NODE_DEV]: {
    devDeps: {
      'ts-node': '^10.2.1',
      'ts-node-dev': '^1.1.8',
      'tsconfig-paths': '^3.11.0'
    }
  }
}
