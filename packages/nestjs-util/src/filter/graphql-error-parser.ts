import { HttpStatus, Logger } from '@nestjs/common'
import { GraphQLError, GraphQLFormattedError } from 'graphql/error'

import { EnrichedExceptionError } from './exception.interface'
import { GraphQLPreformattedException } from './graphql-exception.interface'
import { formatValidationError, getErrorMessage, isValidationError, logErrorDebugMsg } from './util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError {
  const e = exception as any

  let extensions = new EnrichedExceptionError({
    statusCode:
      e.extensions?.exception?.statusCode ??
      e.extensions?.exception?.response?.statusCode ??
      HttpStatus.INTERNAL_SERVER_ERROR,
    error: exception?.name ?? exception?.message,
    message: getErrorMessage(exception),
    service: e.extensions?.exception?.response?.service
  })

  if (isValidationError(e?.extensions?.exception)) {
    const errors = formatValidationError(e.extensions.exception.validation)

    if (errors.length > 0) {
      extensions = {
        ...extensions,
        message: errors.map((err) => err.messages.join(' | ')).join(' | ')
      }
    }
  }

  logErrorDebugMsg(new Logger('GraphQLErrorParser'), extensions, e?.extensions?.exception?.stacktrace)

  return new GraphQLPreformattedException({
    message: getErrorMessage(exception),
    path: exception.path,
    extensions: extensions as any
  })
}
