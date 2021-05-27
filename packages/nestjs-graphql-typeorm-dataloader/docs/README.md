@webundsoehne/nestjs-graphql-typeorm-dataloader

# @webundsoehne/nestjs-graphql-typeorm-dataloader

## Table of contents

### Classes

- [ApolloServerDataLoaderPlugin](classes/apolloserverdataloaderplugin.md)
- [DataLoaderInterceptor](classes/dataloaderinterceptor.md)
- [SelfKeyDataloader](classes/selfkeydataloader.md)
- [ToManyDataloader](classes/tomanydataloader.md)
- [ToOneDataloader](classes/toonedataloader.md)

### Variables

- [CUSTOM\_DATALOADER\_EXTENSION\_FIELD](README.md#custom_dataloader_extension_field)
- [DATA\_LOADER\_CONTEXT\_KEY](README.md#data_loader_context_key)
- [TYPEORM\_DATALOADER\_EXTENSION\_FIELD](README.md#typeorm_dataloader_extension_field)

### Functions

- [CustomLoaderExtension](README.md#customloaderextension)
- [CustomLoaderMiddleware](README.md#customloadermiddleware)
- [TypeormLoaderExtension](README.md#typeormloaderextension)
- [TypeormLoaderMiddleware](README.md#typeormloadermiddleware)
- [directLoader](README.md#directloader)

## Variables

### CUSTOM\_DATALOADER\_EXTENSION\_FIELD

• `Const` **CUSTOM\_DATALOADER\_EXTENSION\_FIELD**: ``"CUSTOM_DATALOADER_EXTENSION_FIELD"``= 'CUSTOM\_DATALOADER\_EXTENSION\_FIELD'

Custom data loader extension data key for the field, that is stored inside the nestjs typestore.
No different then @Extension decorator of nestjs for graphql, just a wrapper for types.

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/extension-field.constants.ts:11

___

### DATA\_LOADER\_CONTEXT\_KEY

• `Const` **DATA\_LOADER\_CONTEXT\_KEY**: ``"DATA_LOADER_CONTEXT"``= 'DATA\_LOADER\_CONTEXT'

The context key of data-loader plugin per key injected by the interceptor or apollo-server plugin.
This will be appended to the context instead of the request to ensure compatibility between two.

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/context.constants.ts:5

___

### TYPEORM\_DATALOADER\_EXTENSION\_FIELD

• `Const` **TYPEORM\_DATALOADER\_EXTENSION\_FIELD**: ``"TYPEORM_DATALOADER_EXTENSION_FIELD"``= 'TYPEORM\_DATALOADER\_EXTENSION\_FIELD'

Typeorm data loader extension data key for the field, that is stored inside the nestjs typestore.
No different then @Extension decorator of nestjs for graphql, just a wrapper for types.

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/extension-field.constants.ts:5

## Functions

### CustomLoaderExtension

▸ **CustomLoaderExtension**<K, V, C\>(`batchLoadFn`: *BatchLoadFn*<K, V\>, `options?`: *DataLoader.Options*<K, V, C\>): MethodDecorator & PropertyDecorator

Add data required for a given field or field-resolver for custom dataloader.
This will pass in a new instance of data loader to batch your function, to the field-resolver itself.

#### Type parameters

| Name | Default |
| :------ | :------ |
| `K` | - |
| `V` | - |
| `C` | K |

#### Parameters

| Name | Type |
| :------ | :------ |
| `batchLoadFn` | *BatchLoadFn*<K, V\> |
| `options?` | *DataLoader.Options*<K, V, C\> |

**Returns:** MethodDecorator & PropertyDecorator

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/decorators/custom-loader.decorator.ts:12

___

### CustomLoaderMiddleware

▸ `Const` **CustomLoaderMiddleware**(`ctx`: *MiddlewareContext*<any, {}, { [argName: string]: *any*;  }\>, `next`: *NextFn*<any\>): *any*

This middleware checks and processes for the subfields of a parent entity that should be resolved by the data loader.
It will automatically run the function that is embedded inside the DATA_LOADER extension field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | *MiddlewareContext*<any, {}, { [argName: string]: *any*;  }\> |
| `next` | *NextFn*<any\> |

**Returns:** *any*

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/middleware/custom-loader.middleware.ts:14

___

### TypeormLoaderExtension

▸ **TypeormLoaderExtension**(`keyFunc`: KeyFunc, `options?`: TypeormLoaderOptions): MethodDecorator & PropertyDecorator

Add data required for a given field or field-resolver for typeorm dataloader.
This will automatically parse and create a dataloader complying to setup in this field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyFunc` | KeyFunc |
| `options?` | TypeormLoaderOptions |

**Returns:** MethodDecorator & PropertyDecorator

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/decorators/typeorm-loader.decorator.ts:12

___

### TypeormLoaderMiddleware

▸ `Const` **TypeormLoaderMiddleware**(`ctx`: *MiddlewareContext*<any, {}, { [argName: string]: *any*;  }\>, `next`: *NextFn*<any\>): *any*

This middleware checks and processes for the subfields of a parent entity that should be resolved by the data loader.
It will automatically parse the subfield with the given decorator according to the relation type given.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | *MiddlewareContext*<any, {}, { [argName: string]: *any*;  }\> |
| `next` | *NextFn*<any\> |

**Returns:** *any*

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/middleware/typeorm-loader.middleware.ts:13

___

### directLoader

▸ **directLoader**<V\>(`relation`: RelationMetadata, `connection`: Connection): *function*

A shared component for handling the end result of the query.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `relation` | RelationMetadata |
| `connection` | Connection |

**Returns:** (`ids`: readonly *any*[]) => *Promise*<V[]\>

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/loaders/direct.loader.ts:7
