interface ResolverData {
  context: any
}

export type BatchLoadFn<K, V> = (keys: readonly K[], data: ResolverData) => PromiseLike<ArrayLike<V | Error>>
