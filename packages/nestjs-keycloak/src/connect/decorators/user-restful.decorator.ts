import { createParamDecorator } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface'

import { EnrichedRequest } from '@interfaces/request.interface'

/**
 * Inject the current Keycloak user to a variable.
 * This only works for RESTFUL applications, please check the alternative one if you require it for a REST API.
 */
export const User = createParamDecorator((key: string, context: ExecutionContext) => {
  const request: EnrichedRequest = context.switchToHttp().getRequest()

  return (request?.user?.[key] ? request.user[key] : request?.user) ?? {}
})
