import merge from 'deepmerge'

export function deepMergeWithUniqueMergeArray<T extends Record<string, any>> (t: T, s: Partial<T>): T {
  return merge(t, s, {
    arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
  })
}

export function mergeObjectsWithArrayOverwrite<T extends Record<string, any>> (t: T, s: Partial<T>): T {
  return merge(t, s, { arrayMerge: (target, source) => source })
}
