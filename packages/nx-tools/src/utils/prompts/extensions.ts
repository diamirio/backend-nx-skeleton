import { ListrTask } from 'listr2'

import { SchemaExtensions, SchemaPriorConfiguration } from '@interfaces/base-schemas.interface'
import { ExtensionsMap } from '@interfaces/extensions.interface'
import { getInitialFromPriorConfiguration, mapPromptChoices } from '@utils/schematics'

export function normalizeExtensionsPrompt<
  Extensions extends string,
  ExtensionsType extends Record<PropertyKey, any>,
  Ctx extends SchemaExtensions<Extensions, ExtensionsType, true> & SchemaPriorConfiguration<SchemaExtensions<Extensions, ExtensionsType, true>>
> (extensions: ExtensionsMap<ExtensionsType, Ctx>, prettyNames: Record<string, string>): ListrTask<Ctx>[] {
  return [
    {
      skip: (ctx): boolean => !!ctx.extensions && ctx.extensions.length > 0,
      task: async (ctx, task): Promise<void> => {
        const parsed = (
          await Promise.all(
            Object.entries(extensions).map(async ([ name, properties ]) => {
              if (typeof (properties as any).condition === 'function' && await (properties as any).condition(ctx)) {
                return name
              } else if (typeof (properties as any).condition === 'boolean' && (properties as any).condition) {
                return name
              }

              return false
            })
          )
        ).filter(Boolean)

        if (parsed.length === 0) {
          ctx.extensions = []

          task.skip('No extensions are available with the selected options.')
        } else {
          const choices = mapPromptChoices<Extensions>(parsed, prettyNames)

          // there can be two selections of API servers here
          ctx.extensions = await task.prompt<Extensions[]>({
            type: 'MultiSelect',
            message: 'Please select the extensions you want.',
            choices,
            initial: getInitialFromPriorConfiguration<Ctx, Extensions>(ctx, 'extensions', choices)
          })

          task.title = `Extensions selected as: ${ctx.extensions.length > 0 ? ctx.extensions.join(', ') : 'none'}`
        }
      },
      options: {
        bottomBar: Infinity,
        persistentOutput: true
      }
    }
  ]
}
