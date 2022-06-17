import { ValueTransformer } from 'typeorm'

export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
  return typeof obj === 'undefined' || obj === null
}

export class ColumnNumericTransformer implements ValueTransformer {
  to(raw?: number | null): number | null {
    return isNullOrUndefined(raw) ? null : raw
  }

  from(raw?: string | null): number | null {
    if (isNullOrUndefined(raw)) {
      return null
    }

    const parsed = parseFloat(raw)
    return isNaN(parsed) ? null : parsed
  }
}
