import type { ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { BaseAuthGuard } from './auth-base.guard'
import type { KeycloakConnectUser } from '@connect/connect.interfaces'
import type { EnrichedFastifyRequest, EnrichedRequest } from '@interfaces/request.interface'

/**
 * Application AuthGuard for Keycloak applications.
 * This only works for GraphQL APIs.
 */
@Injectable()
export class AuthGuard extends BaseAuthGuard {
  static getRequest<Request extends EnrichedRequest<any> = EnrichedFastifyRequest<KeycloakConnectUser>>(context: ExecutionContext): Request {
    return GqlExecutionContext.create(context).getContext().req ?? context.switchToHttp().getRequest()
  }

  getRequest<Request extends EnrichedRequest<any> = EnrichedFastifyRequest<KeycloakConnectUser>>(context: ExecutionContext): Request {
    return AuthGuard.getRequest(context)
  }
}
