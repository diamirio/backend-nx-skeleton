import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage'
import { TypeMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/type-metadata.storage'

import { TYPEORM_DATALOADER_EXTENSION_FIELD } from '@constants/extension-field.constants'
import { KeyFunc } from '@interfaces/typeorm-loader-handler.interface'
import { TypeormLoaderOptions } from '@interfaces/typeorm-loader.interface'

/**
 * Add data required for a given field or field-resolver for typeorm dataloader.
 * This will automatically parse and create a dataloader complying to setup in this field.
 */
export function TypeormLoaderExtension (keyFunc: KeyFunc, options?: TypeormLoaderOptions): MethodDecorator & PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function | object, key: string | symbol): void => {
    LazyMetadataStorage.store(() => {
      TypeMetadataStorage.addExtensionsPropertyMetadata({
        target: target.constructor,
        fieldName: key as string,
        value: {
          [TYPEORM_DATALOADER_EXTENSION_FIELD]: {
            args: { keyFunc, options },
            target,
            key
          }
        }
      })
    })
  }
}
