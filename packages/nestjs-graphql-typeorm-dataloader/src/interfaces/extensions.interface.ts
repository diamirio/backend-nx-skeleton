import DataLoader from 'dataloader'

import { BatchLoadFn } from './batch-loader.interface'
import { KeyFunc } from './typeorm-loader-handler.interface'
import { TypeormLoaderOptions } from './typeorm-loader.interface'
import { CUSTOM_DATALOADER_EXTENSION_FIELD, TYPEORM_DATALOADER_EXTENSION_FIELD } from '@constants/extension-field.constants'

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

/**
 * A generic type to extend from for nestjs extensions.
 */
interface ExtensionType<T> {
  args: T
  key: string | symbol
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Function | object
}
