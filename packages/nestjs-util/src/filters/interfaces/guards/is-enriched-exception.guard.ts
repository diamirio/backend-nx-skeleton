import { EnrichedExceptionError } from '../enriched-exception.interface'

export function isEnrichedExceptionError (exception: unknown): exception is EnrichedExceptionError {
  if (exception instanceof EnrichedExceptionError) {
    return true
  }

  return false
}
