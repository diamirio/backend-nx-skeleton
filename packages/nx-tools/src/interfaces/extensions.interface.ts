import { ValueOf } from '@webundsoehne/ts-utility-types'

export type ExtensionsMap<ExtensionsType extends Record<string, any>, Options extends Record<PropertyKey, any>> = Record<
ValueOf<ExtensionsType>,
{ condition?: boolean | ((options: Options) => boolean) }
>
