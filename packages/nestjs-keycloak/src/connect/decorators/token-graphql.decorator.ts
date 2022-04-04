import { createParamDecorator } from '@nestjs/common'
import type { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface'
import { GqlExecutionContext } from '@nestjs/graphql'

import type { EnrichedRequest } from '@interfaces/request.interface'

/**
 * Fetch the current user access token from the request.
 * This only works for GraphQL applications, please check the alternative one if you require it for a REST API.
 * @alias {GetToken,Token}
 */
export const GetToken = createParamDecorator((_: never, context: ExecutionContext) => {
  const request: EnrichedRequest = GqlExecutionContext.create(context).getContext().req ?? context.switchToHttp().getRequest()

  return request?.accessToken
})

/**
 * Fetch the current user access token from the request.
 * This only works for GraphQL applications, please check the alternative one if you require it for a REST API.
 * @alias {GetToken,Token}
 * @deprecated Use GetToken instead because of the more generic naming scheme.
 */
export const Token: typeof GetToken = GetToken
