import type { ArrayElement, InferedObjectType } from '@webundsoehne/ts-utility-types'

/**
 * Matchs a data and returns another property of the object.
 */
export function getMatchingPropertyFromData<T extends Record<PropertyKey, any>[], K extends keyof ArrayElement<T>, P extends keyof ArrayElement<T>> (
  data: T,
  compare: K,
  value: InferedObjectType<T, K>,
  fetch: P
): InferedObjectType<T, P> {
  const returnValue = data.find((d) => d[compare] === value)[fetch]

  if (!returnValue) {
    throw new Error(`No data can be found with ${compare}: ${value}`)
  }

  return returnValue
}

/**
 * Returns the matched data.
 */
export function filterMatchingPropertyFromData<T extends Record<PropertyKey, any>[], K extends keyof ArrayElement<T>, P extends keyof ArrayElement<T>> (
  data: T,
  compare: K,
  values: InferedObjectType<T, K>[],
  fetch: P
): InferedObjectType<T, P>[] {
  const returnValues = data.filter((d) => values.includes(d[compare])).map((d) => d[fetch])

  if (returnValues.length === 0) {
    throw new Error(`No data can be filtered using ${compare} to get ${fetch}: ${values.join(', ')}`)
  }

  return returnValues
}
