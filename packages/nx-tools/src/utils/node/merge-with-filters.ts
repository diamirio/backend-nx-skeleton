import merge from 'deepmerge'

// deep merge all does not work in all cases

/**
 * Merge objects with defaults.
 *
 * Mutates the object.
 * @param t
 * @param s
 */
export function deepMerge<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return s.reduce((o, val) => {
    return merge(o, val ?? {})
  }, t) as T
}

/**
 * Merge objects with array merge and filtering them uniquely.
 *
 * Mutates the object.
 * @param t
 * @param s
 */
export function deepMergeWithUniqueMergeArray<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return s.reduce((o, val) => {
    return merge(o, val ?? {}, {
      arrayMerge: (target, source) => [ ...target, ...source ].filter(uniqueArrayFilter)
    })
  }, t) as T
}

/**
 * Merge objects with overwriting the target array with source array.
 *
 * Mutates the object.
 * @param t
 * @param s
 */
export function deepMergeWithArrayOverwrite<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return s.reduce((o, val) => {
    return merge(o, val ?? {}, {
      arrayMerge: (_, source) => source
    })
  }, t) as T
}

/**
 * A standard array filter for filtering it to unique items.
 */
export const uniqueArrayFilter = (item: any, index: number, array: any[]): boolean => array.indexOf(item) === index
