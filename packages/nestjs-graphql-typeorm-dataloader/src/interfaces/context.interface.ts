import type { Connection } from 'typeorm'

/**
 * The custom context entry that this plugin runs up on to inject the connection,
 * and keep track of the request.
 */
export interface Context {
  DATA_LOADER_CONTEXT: {
    requestId: string
    typeormGetConnection?: () => Connection
  }
}
