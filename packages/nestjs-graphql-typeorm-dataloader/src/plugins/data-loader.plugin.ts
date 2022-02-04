/* eslint-disable @typescript-eslint/naming-convention */
import type {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
  GraphQLRequestContext,
  WithRequired,
  GraphQLRequestContextWillSendResponse
} from 'apollo-server-plugin-base'
import { Container } from 'typedi'
import { v4 as uuidv4 } from 'uuid'

import { DATA_LOADER_CONTEXT_KEY } from '@constants/context.constants'
import type { ApolloServerLoaderPluginOptions } from '@interfaces/apollo-server-plugin.interface'
import type { Context } from '@interfaces/context.interface'

export class ApolloServerDataLoaderPlugin implements ApolloServerPlugin {
  constructor (private options?: ApolloServerLoaderPluginOptions) {}

  // for graphql 16+ this expect a return of promise for each case
  async requestDidStart (): Promise<GraphQLRequestListener<BaseContext>> {
    const options = this.options

    return {
      didResolveSource: async (requestContext: WithRequired<GraphQLRequestContext<Context>, 'queryHash' | 'source' | 'metrics'>): Promise<void> => {
        requestContext.context[DATA_LOADER_CONTEXT_KEY] = {
          requestId: uuidv4(),
          typeormGetConnection: options?.typeormGetConnection
        }
      },
      willSendResponse: async (requestContext: GraphQLRequestContextWillSendResponse<Context>): Promise<void> => {
        // eslint-disable-next-line no-underscore-dangle
        Container.reset(requestContext.context[DATA_LOADER_CONTEXT_KEY].requestId)
      }
    }
  }
}
