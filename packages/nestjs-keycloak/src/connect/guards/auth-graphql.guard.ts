import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { BaseAuthGuard } from './auth-base.guard'
import { EnrichedFastifyRequest, EnrichedExpressRequest } from '@interfaces/request.interface'

/**
 * Application AuthGuard for Keycloak applications.
 * This only works for GraphQL APIs.
 */
@Injectable()
export class AuthGuard extends BaseAuthGuard {
  public getRequest<Request extends EnrichedFastifyRequest | EnrichedExpressRequest = EnrichedFastifyRequest>(context: ExecutionContext): Request {
    return GqlExecutionContext.create(context).getContext().req ?? context.switchToHttp().getRequest()
  }
}
