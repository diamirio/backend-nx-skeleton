import type { GraphQLFormattedError } from 'graphql/error'
import { GraphQLError } from 'graphql/error'

import { GraphQLPreformattedException } from './interface'
import type { EnrichedExceptionError } from '@webundsoehne/nestjs-util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError {
  // then this means that this does not come from the nestjs part of the application
  // it is directly a graphql error
  if (!exception?.extensions?.response) {
    delete exception.extensions?.exception

    exception.extensions.code ??= GraphQLError.name

    return exception
  }

  const extensions = exception.extensions.response as EnrichedExceptionError

  const message = structuredClone(extensions.message)

  // TODO: can be updated with typescript 5
  delete (extensions as any).message

  return new GraphQLPreformattedException({
    ...exception,
    message,
    extensions: {
      code: exception.extensions.code,
      ...extensions
    }
  }) as unknown as GraphQLFormattedError
}
