import type { ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

import { BaseAuthGuard } from './auth-base.guard'
import type { EnrichedExpressRequest, EnrichedFastifyRequest } from '@interfaces/request.interface'

/**
 * Application AuthGuard for Keycloak applications.
 * This only works for REST APIs.
 */
@Injectable()
export class AuthGuard extends BaseAuthGuard {
  static getRequest<Request extends EnrichedFastifyRequest | EnrichedExpressRequest = EnrichedFastifyRequest>(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest()
  }

  getRequest<Request extends EnrichedFastifyRequest | EnrichedExpressRequest = EnrichedFastifyRequest>(context: ExecutionContext): Request {
    return AuthGuard.getRequest(context)
  }
}
