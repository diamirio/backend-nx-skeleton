export async function setSchemaDefaultsInContext<T = Record<string, any>, K = Record<string, any>> (
  ctx: T,
  options: { assign?: { from: K, keys: (keyof K)[] }, default?: { key: keyof T, value: T[keyof T] }[] }
): Promise<T> {
  if (options?.assign) {
    await Promise.all(
      options.assign.keys.map(async (item) => {
        if (options.assign.from[item]) {
          ctx[item as string] = options.assign.from[item]
        }
      })
    )
  }

  // defaults
  if (options?.default) {
    await Promise.all(
      options.default.map(async (item) => {
        ctx[item.key] = item.value
      })
    )
  }

  return ctx
}
