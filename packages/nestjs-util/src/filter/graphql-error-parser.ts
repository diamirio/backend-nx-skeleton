import { HttpStatus, Logger } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import { EOL } from 'os'

import { EnrichedException } from './exception.interface'
import { formatValidationError, getErrorMessage, isValidationError, logErrorDebugMsg } from './util'

export function GraphQLErrorParser (exception: GraphQLError): EnrichedException {
  let payload = {
    statusCode: exception.extensions?.exception?.response?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    error: exception?.name ?? exception.message,
    message: getErrorMessage(exception),
    path: exception.path?.map((i) => i.toString())
  }

  if (isValidationError(exception.extensions.exception)) {
    const errors = formatValidationError(exception.extensions.exception.validation)

    payload = {
      ...payload,
      message: errors.map((err) => err.messages.join(' | ')).join(' | ')
    }
  }

  logErrorDebugMsg(new Logger('GraphQLErrorParser'), payload, exception.extensions?.exception.stacktrace.join(EOL))

  return payload
}
