import type { Versions } from './versions.interface'
import { AvailableBuilders } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {},

  [AvailableBuilders.TSC]: {
    devDeps: {
      ['tsconfig-replace-paths']: '^0.0.11',
      ['tsc-watch']: '^5'
    }
  },

  [AvailableBuilders.TS_NODE_DEV]: {
    devDeps: {
      ['ts-node']: '^10',
      ['ts-node-dev']: '^2',
      ['tsconfig-paths']: '^4'
    }
  }
}
