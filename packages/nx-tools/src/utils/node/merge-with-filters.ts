import merge from 'deepmerge'

/**
 * Merge objects with array merge and filtering them uniquely.
 *
 * Mutates the object.
 * @param t
 * @param s
 */
export function deepMergeWithUniqueMergeArray<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return s.reduce((o, val) => {
    return merge(o, val, {
      arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
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
export function mergeObjectsWithArrayOverwrite<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return s.reduce((o, val) => {
    return merge(o, val, { arrayMerge: (_, source) => source })
  }, t) as T
}
