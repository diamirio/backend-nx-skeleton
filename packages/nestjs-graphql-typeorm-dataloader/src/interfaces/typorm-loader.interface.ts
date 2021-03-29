import { KeyFunc } from './typeorm-loader-handler.interface'

export interface TypeormLoaderOptions {
  selfKey: boolean
}

export type TypeormLoaderExtensionInput = [keyFunc: KeyFunc, options?: TypeormLoaderOptions]

export interface ParsedTypeormExtensionInput {
  keyFunc: KeyFunc
  options: TypeormLoaderOptions
}
