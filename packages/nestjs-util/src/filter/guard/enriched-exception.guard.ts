import { EnrichedExceptionError } from '@filter/interface'

export function isEnrichedException (exception: unknown): exception is EnrichedExceptionError {
  if (exception instanceof EnrichedExceptionError) {
    return true
  }

  return false
}
