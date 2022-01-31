import type { ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { BaseAuthGuard } from './auth-base.guard'
import type { EnrichedFastifyRequest, EnrichedExpressRequest } from '@interfaces/request.interface'

/**
 * Application AuthGuard for Keycloak applications.
 * This only works for GraphQL APIs.
 */
@Injectable()
export class AuthGuard extends BaseAuthGuard {
  getRequest<Request extends EnrichedFastifyRequest | EnrichedExpressRequest = EnrichedFastifyRequest>(context: ExecutionContext): Request {
    return GqlExecutionContext.create(context).getContext().req ?? context.switchToHttp().getRequest()
  }
}
