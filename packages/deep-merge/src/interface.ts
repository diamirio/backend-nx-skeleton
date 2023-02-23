import type { ArrayMergeBehavior } from './constants'

export type ArrayMergeFn = (target: unknown[], source: unknown[]) => unknown[]

export interface DeepMergeOptions {
  clone?: boolean
  arrayMerge?: ArrayMergeBehavior | ArrayMergeFn
}
