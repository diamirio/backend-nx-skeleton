import type { Connection } from 'typeorm'

export const DATA_LOADER_CONTEXT_KEY = 'DATA_LOADER_CONTEXT'

export interface Context {
  DATA_LOADER_CONTEXT: {
    requestId: string
    typeormGetConnection?: () => Connection
  }
}
