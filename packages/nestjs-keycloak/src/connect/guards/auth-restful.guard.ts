import { ExecutionContext, Injectable } from '@nestjs/common'

import { BaseAuthGuard } from './auth-base.guard'
import { EnrichedExpressRequest, EnrichedFastifyRequest } from '@interfaces/request.interface'

/**
 * Application AuthGuard for Keycloak applications.
 * This only works for REST APIs.
 */
@Injectable()
export class AuthGuard extends BaseAuthGuard {
  public getRequest (context: ExecutionContext): EnrichedFastifyRequest | EnrichedExpressRequest {
    return context.switchToHttp().getRequest()
  }
}
