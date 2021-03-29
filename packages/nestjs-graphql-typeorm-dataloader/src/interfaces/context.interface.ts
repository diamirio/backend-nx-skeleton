import type { Connection } from 'typeorm'

export interface Context {
  DATA_LOADER_CONTEXT: {
    requestId: string
    typeormGetConnection?: () => Connection
  }
}
