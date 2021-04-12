interface ResolverData {
  context: any
}

/**
 * A basic batch loader function for custom data loader.
 */
export type BatchLoadFn<K, V> = (keys: readonly K[], data: ResolverData) => PromiseLike<ArrayLike<V | Error>>
