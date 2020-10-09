/**
 * Given the context it initiates default keys and keys transfered over from the angular-schematics.
 * Will mutate the object! That is the idea.
 * @param ctx
 * @param options While it will assign the keys directly in assign, it will set the defaults.
 */
export function setSchemaDefaultsInContext<T = Record<string, any>, K = Record<string, any>> (
  ctx: T,
  options: { assign?: { from: K, keys: (keyof K)[] }, default?: Partial<T>[] }
): void {
  options.assign?.keys.forEach((i) => {
    if (options.assign.from[i]) {
      ctx[i as string] = options.assign.from[i]
    }
  })

  // defaults
  options.default?.forEach((i) => {
    Object.assign(ctx, i)
  })
}
