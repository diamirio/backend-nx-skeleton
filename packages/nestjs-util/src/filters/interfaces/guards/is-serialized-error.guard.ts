import type { EnrichedExceptionError } from '../enriched-exception.interface'

export function isSerializedError (exception: unknown): exception is { error: Error } {
  if (
    typeof exception === 'object' &&
    'error' in exception &&
    typeof (exception as Record<PropertyKey, unknown>).error === 'object' &&
    // TODO: this should be satisfies when the typescript version in the library is updated, types can also be updated
    (['message', 'name'] as (keyof Error)[]).every((key) => key in (exception as any).error)
  ) {
    return true
  } else if (
    typeof exception === 'object' &&
    // TODO: this should be satisfies when the typescript version in the library is updated
    (['message', 'name', 'statusCode'] as (keyof EnrichedExceptionError)[]).every((key) => key in exception)
  ) {
    return true
  }

  return false
}
