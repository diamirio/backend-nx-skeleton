import { createParamDecorator } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface'

import { EnrichedRequest } from '@interfaces/request.interface'

/**
 * Inject the current Keycloak user to a variable.
 * This only works for RESTFUL applications, please check the alternative one if you require it for a REST API.
 * @alias {GetUser,User}
 */
export const GetUser = createParamDecorator((key: string, context: ExecutionContext) => {
  const request: EnrichedRequest = context.switchToHttp().getRequest()

  return (request?.user?.[key] ? request.user[key] : request?.user) ?? {}
})

/**
 * Inject the current Keycloak user to a variable.
 * This only works for RESTFUL applications, please check the alternative one if you require it for a REST API.
 * @alias {GetUser,User}
 * @deprecated Use GetUser instead because of the more generic naming scheme.
 */
export const User: typeof GetUser = GetUser
