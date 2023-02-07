import merge from 'deepmerge'

import type { DeepPartial } from '@webundsoehne/ts-utility-types'

// deep merge all does not work in all cases

/**
 * Merge objects with defaults.
 *
 * Mutates the object.
 */
export function deepMerge<T extends Record<PropertyKey, any>> (t: T, ...s: DeepPartial<T>[]): T {
  return deepMergeWithUniqueMergeArray(t, ...s)
}

/**
 * Merge objects with array merge and filtering them uniquely.
 *
 * Mutates the object.
 */
export function deepMergeWithUniqueMergeArray<T extends Record<PropertyKey, any>> (t: T, ...s: DeepPartial<T>[]): T {
  return merge.all([
    t,
    ...s ?? [],
    {
      arrayMerge: (target, source) => [...target, ...source].filter(uniqueArrayFilter)
    }
  ]) as T
}

/**
 * Merge objects with overwriting the target array with source array.
 *
 * Mutates the object.
 */
export function deepMergeWithArrayOverwrite<T extends Record<PropertyKey, any>> (t: T, ...s: DeepPartial<T>[]): T {
  return merge.all([
    t,
    ...s ?? [],
    {
      arrayMerge: (_, source) => source
    }
  ]) as T
}

/**
 * A standard array filter for filtering it to unique items.
 */
export const uniqueArrayFilter = (item: any, index: number, array: any[]): boolean => array.indexOf(item) === index
