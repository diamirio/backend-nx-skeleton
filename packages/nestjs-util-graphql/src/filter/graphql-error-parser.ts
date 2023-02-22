import type { GraphQLError, GraphQLFormattedError } from 'graphql/error'

import { GraphQLPreformattedException } from './interface'
import { EnrichedExceptionError } from '@webundsoehne/nestjs-util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError {
  const extensions = new EnrichedExceptionError(JSON.parse(exception.message))

  const message = structuredClone(extensions.message)

  delete extensions.message

  return new GraphQLPreformattedException({
    ...exception,
    message,
    extensions
  }) as unknown as GraphQLFormattedError
}
