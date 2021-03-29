import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage'
import { TypeMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/type-metadata.storage'
import DataLoader from 'dataloader'

import { CUSTOM_DATALOADER_EXTENSION_FIELD } from '@constants/extension-field.constants'
import { BatchLoadFn } from '@interfaces/batch-loader.interface'

/**
 * Add data required for a given field or field-resolver for custom dataloader.
 */
export function CustomLoaderExtension<K, V, C = K> (batchLoadFn: BatchLoadFn<K, V>, options?: DataLoader.Options<K, V, C>): MethodDecorator & PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function | object, key: string | symbol): void => {
    LazyMetadataStorage.store(() => {
      TypeMetadataStorage.addExtensionsPropertyMetadata({
        target: target.constructor,
        fieldName: key as string,
        value: {
          [CUSTOM_DATALOADER_EXTENSION_FIELD]: {
            args: { batchLoadFn, options },
            target,
            key
          }
        }
      })
    })
  }
}
