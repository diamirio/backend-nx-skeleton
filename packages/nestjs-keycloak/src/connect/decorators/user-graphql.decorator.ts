import { createParamDecorator } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface'
import { GqlExecutionContext } from '@nestjs/graphql'

import { EnrichedRequest } from '@interfaces/request.interface'

/**
 * Inject the current Keycloak user to a variable.
 * This only works for GraphQL applications, please check the alternative one if you require it for a REST API.
 */
export const User = createParamDecorator((key: string, context: ExecutionContext) => {
  const request: EnrichedRequest = GqlExecutionContext.create(context).getContext().req ?? context.switchToHttp().getRequest()

  return (request?.user?.[key] ? request.user[key] : request?.user) ?? {}
})
