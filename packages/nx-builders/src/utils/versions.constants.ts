import type { Versions } from './versions.interface'
import { AvailableBuilders } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {},

  [AvailableBuilders.TSC]: {
    devDeps: {
      ['tsconfig-replace-paths']: '^0.0.11',
      ['tsc-watch']: '^5.0.3'
    }
  },

  [AvailableBuilders.TS_NODE_DEV]: {
    devDeps: {
      ['ts-node']: '^10.8.1',
      ['ts-node-dev']: '^2.0.0',
      ['tsconfig-paths']: '^4.0.0'
    }
  }
}
