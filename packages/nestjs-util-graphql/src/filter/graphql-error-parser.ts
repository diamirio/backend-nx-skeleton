import type { GraphQLError, GraphQLFormattedError } from 'graphql/error'

import { GraphQLPreformattedException } from './interface'
import { EnrichedExceptionError } from '@webundsoehne/nestjs-util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError {
  const extensions = new EnrichedExceptionError({
    code: exception?.extensions.code,
    ...(exception?.extensions as any)?.response ?? {}
  })

  return new GraphQLPreformattedException({
    ...exception,
    extensions
  }) as unknown as GraphQLFormattedError
}
