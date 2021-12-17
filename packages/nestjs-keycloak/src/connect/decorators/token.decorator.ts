import { createParamDecorator } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface'
import { GqlExecutionContext } from '@nestjs/graphql'

import { EnrichedRequest } from '@interfaces/request.interface'

export const Token = createParamDecorator((_: never, context: ExecutionContext) => {
  const request: EnrichedRequest = GqlExecutionContext.create(context).getContext().req ?? context.switchToHttp().getRequest()

  return request?.accessToken
})
