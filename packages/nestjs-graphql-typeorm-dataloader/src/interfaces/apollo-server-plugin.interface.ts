import type { Connection } from 'typeorm'

export interface ApolloServerLoaderPluginOptions {
  typeormGetConnection?: () => Connection
}
