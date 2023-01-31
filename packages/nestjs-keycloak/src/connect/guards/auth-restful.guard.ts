import type { ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

import { BaseAuthGuard } from './auth-base.guard'
import type { KeycloakConnectUser } from '@connect/connect.interfaces'
import type { EnrichedFastifyRequest, EnrichedRequest } from '@interfaces/request.interface'

/**
 * Application AuthGuard for Keycloak applications.
 * This only works for REST APIs.
 */
@Injectable()
export class AuthGuard extends BaseAuthGuard {
  static getRequest<Request extends EnrichedRequest<any> = EnrichedFastifyRequest<KeycloakConnectUser>>(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest()
  }

  getRequest<Request extends EnrichedRequest<any> = EnrichedFastifyRequest<KeycloakConnectUser>>(context: ExecutionContext): Request {
    return AuthGuard.getRequest(context)
  }
}
