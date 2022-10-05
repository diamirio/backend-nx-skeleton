import type { BadRequestException } from '@nestjs/common'
import { HttpStatus, Logger } from '@nestjs/common'
import type { GraphQLError, GraphQLFormattedError } from 'graphql/error'
import { EOL } from 'os'

import { GraphQLPreformattedException } from './graphql-exception.interface'
import type { ClassValidatorException, EnrichedException } from '@webundsoehne/nestjs-util'
import { EnrichedExceptionError } from '@webundsoehne/nestjs-util'
import { formatValidationError, getErrorMessage, isValidationError, logErrorDebugMsg } from '@webundsoehne/nestjs-util/dist/filter/util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError {
  // they removed the extensions type from the graphql error in graphql-v16 so types are a mess now
  let extensions = new EnrichedExceptionError({
    statusCode:
      (exception.extensions?.exception as EnrichedException)?.statusCode ??
      ((exception.extensions?.exception as any)?.response as EnrichedException)?.statusCode ??
      HttpStatus.INTERNAL_SERVER_ERROR,
    error: exception?.name ?? exception?.message,
    message: getErrorMessage(exception),
    service: ((exception.extensions?.exception as any)?.response as EnrichedException)?.service
  })

  if (isValidationError(exception?.extensions?.exception as BadRequestException)) {
    const errors = formatValidationError((exception.extensions.exception as ClassValidatorException).validation)

    if (errors.length > 0) {
      extensions = {
        ...extensions,
        message: errors.map((err) => err.messages.join(' | ')).join(' | ')
      }
    }
  }

  logErrorDebugMsg(new Logger('GraphQLErrorParser'), extensions, (exception?.extensions?.exception as any)?.stacktrace?.join(EOL))

  return new GraphQLPreformattedException({
    message: getErrorMessage(exception),
    path: exception.path,
    extensions
  }) as unknown as GraphQLFormattedError
}
