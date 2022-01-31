import type { ConvertToPromptType } from './parse-arguments.interface'

export function getInitialFromPriorConfiguration<T extends Record<PropertyKey, any> & Record<'priorConfiguration', any>, K> (
  ctx: T,
  key: keyof T['priorConfiguration'],
  choices: ConvertToPromptType<K>
): number[] | number {
  if (ctx?.priorConfiguration?.[key] && Array.isArray(ctx.priorConfiguration[key])) {
    return (
      (ctx.priorConfiguration?.[key] as unknown as any[])?.reduce((o, val) => {
        choices.forEach((v, i) => {
          if (v.name === val) {
            o = [ ...o, i ]
          }
        })

        return o
      }, []) ?? []
    )
  } else {
    let value = -1

    choices.forEach((val, i) => {
      if (val.name === ctx.priorConfiguration?.[key]) {
        value = i
      }
    })

    return value
  }
}
