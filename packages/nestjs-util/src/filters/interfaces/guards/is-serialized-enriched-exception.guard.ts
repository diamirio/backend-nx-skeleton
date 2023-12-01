import type { EnrichedExceptionError } from '../enriched-exception.interface'

export function isSerializedEnrichedExceptionError (exception: unknown): exception is EnrichedExceptionError {
  // TODO: this should be satisfies when the typescript version in the library is updated
  if (typeof exception === 'object' && (['message', 'name', 'statusCode'] as (keyof EnrichedExceptionError)[]).every((key) => key in exception)) {
    return true
  }

  return false
}
