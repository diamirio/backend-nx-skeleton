import type { GraphQLError, GraphQLFormattedError } from 'graphql/error'

import { GraphQLPreformattedException } from './interface'
import type { EnrichedException } from '@webundsoehne/nestjs-util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError {
  const extensions = exception.extensions.response as EnrichedException

  const message = structuredClone(extensions.message)

  delete extensions.message

  return new GraphQLPreformattedException({
    ...exception,
    message,
    extensions: {
      code: exception.extensions.code,
      ...extensions
    }
  }) as unknown as GraphQLFormattedError
}
