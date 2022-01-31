import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Container } from 'typedi'
import { v4 as uuidv4 } from 'uuid'

import { DATA_LOADER_CONTEXT_KEY } from '@constants/context.constants'
import type { ApolloServerLoaderPluginOptions } from '@interfaces/apollo-server-plugin.interface'
import type { Context } from '@interfaces/context.interface'

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor (private options?: ApolloServerLoaderPluginOptions) {}

  public intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx: Context = GqlExecutionContext.create(context).getContext()

    if (!ctx) {
      return next.handle()
    }

    // initiate a custom DI container with id
    ctx[DATA_LOADER_CONTEXT_KEY] = {
      requestId: uuidv4(),
      typeormGetConnection: this.options?.typeormGetConnection
    }

    return next.handle().pipe(
      tap(() => {
        // clean up the container
        Container.reset(ctx[DATA_LOADER_CONTEXT_KEY].requestId)
      })
    )
  }
}
