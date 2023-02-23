import deepmerge from 'deepmerge'

import { ArrayMergeBehavior } from './constants'
import type { ArrayMergeFn, DeepMergeOptions } from './interface'
import { arrayMergeOverwrite, arrayMergeUnique } from './utils'
import type { DeepPartial } from '@webundsoehne/ts-utility-types'

// deep merge all does not work in all cases

/**
 * Merge objects with defaults.
 *
 * Mutates the object depending on the options.clone key.
 */
export function merge<T extends Record<PropertyKey, any>> (options: DeepMergeOptions | null, t: T, ...s: DeepPartial<T>[]): T {
  options = {
    arrayMerge: ArrayMergeBehavior.UNIQUE,
    clone: true,
    ...options ?? {}
  }

  let arrayMerge: ArrayMergeFn

  if (typeof options.arrayMerge === 'function') {
    arrayMerge = options.arrayMerge
  } else if (options.arrayMerge === ArrayMergeBehavior.OVERWRITE) {
    arrayMerge = arrayMergeOverwrite
  } else if (options.arrayMerge === ArrayMergeBehavior.UNIQUE) {
    arrayMerge = arrayMergeUnique
  }

  return deepmerge.all([t ?? {}, ...s ?? []], {
    clone: options.clone,
    arrayMerge
  }) as T
}
