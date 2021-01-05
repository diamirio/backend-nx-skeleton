import { HttpStatus, Logger } from '@nestjs/common'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { EOL } from 'os'
import rewire from 'rewire'

import { EnrichedException } from './exception.interface'
import { formatValidationError, getErrorMessage, isValidationError, logErrorDebugMsg } from './util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError<EnrichedException> {
  let payload: EnrichedException = {
    statusCode:
      exception.extensions?.exception?.statusCode ??
      exception.extensions?.exception?.response?.statusCode ??
      HttpStatus.INTERNAL_SERVER_ERROR,
    error: exception?.name ?? exception.message,
    message: getErrorMessage(exception),
    service: exception.extensions?.exception?.response?.service
  }

  if (isValidationError(exception.extensions.exception)) {
    const errors = formatValidationError(exception.extensions.exception.validation)

    payload = {
      ...payload,
      message: errors.map((err) => err.messages.join(' | ')).join(' | ')
    }
  }

  logErrorDebugMsg(new Logger('GraphQLErrorParser'), payload, exception.extensions?.exception.stacktrace.join(EOL))

  return {
    message: getErrorMessage(exception),
    path: exception.path,
    extensions: payload
  }
}

// ugly bandaid for this change.
// https://github.com/graphql/graphql-js/pull/2731
// eslint-disable-next-line no-underscore-dangle
rewire('graphql/error/locatedError').__set__('locatedError', (originalError: any, nodes: any, path?: any) => {
  // Sometimes a non-error is thrown, wrap it as an Error instance to ensure a consistent Error interface.
  // Note: this uses a brand-check to support GraphQL errors originating from other contexts.
  if (Array.isArray(originalError.path)) {
    return originalError
  }

  return new GraphQLError(
    originalError.message,
    originalError.nodes ?? nodes,
    originalError.source,
    originalError.positions,
    path,
    originalError
  )
})
