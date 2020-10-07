import merge from 'deepmerge'

export function deepMergeWithUniqueMergeArray (t: Record<string, any>, s: Record<string, any>): Record<string, any> {
  return merge(t, s, {
    arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
  })
}
