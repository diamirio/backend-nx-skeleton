import type { ArrayMergeFn } from './interface'

/**
 * A standard array filter for filtering it to unique items.
 */
export const uniqueArrayFilter = (item: any, index: number, array: any[]): boolean => array.indexOf(item) === index

export const arrayMergeUnique: ArrayMergeFn = (target, source) => [...target, ...source].filter(uniqueArrayFilter)

export const arrayMergeOverwrite: ArrayMergeFn = (_, source) => source
