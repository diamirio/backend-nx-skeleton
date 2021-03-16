/* eslint-disable @typescript-eslint/naming-convention */
import type { ApolloServerPlugin, BaseContext, GraphQLRequestListener } from 'apollo-server-plugin-base'
import { Container } from 'typedi'
import { v4 as uuidv4 } from 'uuid'

import { ApolloServerLoaderPluginOptions } from '@interfaces/apollo-server-plugin.interface'
import { Context } from '@interfaces/context'

export class ApolloServerDataLoaderPlugin implements ApolloServerPlugin {
  constructor (private options?: ApolloServerLoaderPluginOptions) {}

  public requestDidStart (): GraphQLRequestListener<BaseContext> | void {
    const options = this.options

    return {
      didResolveSource (requestContext: { context: BaseContext }): void {
        Object.assign(requestContext.context, {
          _tgdContext: {
            requestId: uuidv4(),
            typeormGetConnection: options?.typeormGetConnection
          } as Context
        })
      },
      willSendResponse (requestContext: { context: BaseContext }): void {
        // eslint-disable-next-line no-underscore-dangle
        Container.reset(requestContext.context._tgdContext.requestId)
      }
    }
  }
}
