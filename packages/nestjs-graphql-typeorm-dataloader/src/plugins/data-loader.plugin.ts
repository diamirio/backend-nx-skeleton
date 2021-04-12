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
import { ApolloServerLoaderPluginOptions } from '@interfaces/apollo-server-plugin.interface'
import { Context } from '@interfaces/context.interface'

export class ApolloServerDataLoaderPlugin implements ApolloServerPlugin {
  constructor (private options?: ApolloServerLoaderPluginOptions) {}

  public requestDidStart (): GraphQLRequestListener<BaseContext> | void {
    const options = this.options

    return {
      didResolveSource: (requestContext: WithRequired<GraphQLRequestContext<Context>, 'queryHash' | 'source' | 'metrics'>): void => {
        requestContext.context[DATA_LOADER_CONTEXT_KEY] = {
          requestId: uuidv4(),
          typeormGetConnection: options?.typeormGetConnection
        }
      },
      willSendResponse: (requestContext: GraphQLRequestContextWillSendResponse<Context>): void => {
        // eslint-disable-next-line no-underscore-dangle
        Container.reset(requestContext.context[DATA_LOADER_CONTEXT_KEY].requestId)
      }
    }
  }
}
