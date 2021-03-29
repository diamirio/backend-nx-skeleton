import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage'
import { TypeMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/type-metadata.storage'

import { TypeormLoaderExtensionInput } from '@interfaces/typorm-loader.interface'
import { TYPEORM_DATALOADER_EXTENSION_FIELD } from '@src/constants/extension-field.constants'

/**
 * Add data required for a given field or field-resolver for typeorm dataloader.
 */
export function TypeormLoaderExtension (...args: TypeormLoaderExtensionInput): MethodDecorator & PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function | object, key: string | symbol): void => {
    LazyMetadataStorage.store(() => {
      TypeMetadataStorage.addExtensionsPropertyMetadata({
        target: target.constructor,
        fieldName: key as string,
        value: {
          [TYPEORM_DATALOADER_EXTENSION_FIELD]: {
            args,
            target,
            key
          }
        }
      })
    })
  }
}
