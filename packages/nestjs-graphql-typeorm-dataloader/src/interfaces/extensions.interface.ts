import type DataLoader from 'dataloader'

import type { BatchLoadFn } from './batch-loader.interface'
import type { KeyFunc } from './typeorm-loader-handler.interface'
import type { TypeormLoaderOptions } from './typeorm-loader.interface'
import type { CUSTOM_DATALOADER_EXTENSION_FIELD, TYPEORM_DATALOADER_EXTENSION_FIELD } from '@constants/extension-field.constants'

/**
 * A generic type to extend from for nestjs extensions.
 */
interface ExtensionType<T> {
  args: T
  key: string | symbol
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Function | object
}

/**
 * Extension field definition for nest.js to store metadata of decorators.
 */
export interface Extensions {
  [key: string]: any

  [TYPEORM_DATALOADER_EXTENSION_FIELD]: ExtensionType<{ keyFunc: KeyFunc, options?: TypeormLoaderOptions }>

  [CUSTOM_DATALOADER_EXTENSION_FIELD]: ExtensionType<{
    batchLoadFn: BatchLoadFn<any, any>
    options?: DataLoader.Options<any, any, any>
  }>
}
