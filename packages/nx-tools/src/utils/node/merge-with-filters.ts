import merge from 'deepmerge'

/**
 * Merge objects with defaults.
 *
 * Mutates the object.
 * @param t
 * @param s
 */
export function deepMerge<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return merge.all([ t, ...s ]) as T
}

/**
 * Merge objects with array merge and filtering them uniquely.
 *
 * Mutates the object.
 * @param t
 * @param s
 */
export function deepMergeWithUniqueMergeArray<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return merge.all([ t, ...s ], {
    arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
  }) as T
}

/**
 * Merge objects with overwriting the target array with source array.
 *
 * Mutates the object.
 * @param t
 * @param s
 */
export function deepMergeWithArrayOverwrite<T extends Record<string, any>> (t: T, ...s: Partial<T>[]): T {
  return merge.all([ t, ...s ], {
    arrayMerge: (_, source) => source
  }) as T
}
