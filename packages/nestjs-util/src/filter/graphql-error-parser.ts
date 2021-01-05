import { HttpStatus } from '@nestjs/common'
import { GraphQLError, GraphQLFormattedError } from 'graphql'

import { EnrichedException } from './exception.interface'
import { formatValidationError, getErrorMessage, isValidationError } from './util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError<EnrichedException> {
  let payload: EnrichedException = {
    statusCode: exception.extensions?.exception?.response?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
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

  // logErrorDebugMsg(new Logger('GraphQLErrorParser'), payload, exception.extensions?.exception.stacktrace.join(EOL))

  return {
    message: getErrorMessage(exception),
    path: exception.path,
    extensions: payload
  }
}
