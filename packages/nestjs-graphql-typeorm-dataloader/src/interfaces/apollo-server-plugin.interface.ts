import type { Connection } from 'typeorm'

/**
 * Options for the dataloader interceptor and the apollo server plugin.
 * Typeorm connection must be passed in to use the typeorm data loader.
 * Field middleware has no way of accessing nestjs dependency injection so
 * the injection of the connection must be done manually.
 */
export interface ApolloServerLoaderPluginOptions {
  typeormGetConnection?: () => Connection
}
