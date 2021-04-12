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

- [CUSTOM_DATALOADER_EXTENSION_FIELD](README.md#custom_dataloader_extension_field)
- [DATA_LOADER_CONTEXT_KEY](README.md#data_loader_context_key)
- [TYPEORM_DATALOADER_EXTENSION_FIELD](README.md#typeorm_dataloader_extension_field)

### Functions

- [CustomLoaderExtension](README.md#customloaderextension)
- [CustomLoaderMiddleware](README.md#customloadermiddleware)
- [TypeormLoaderExtension](README.md#typeormloaderextension)
- [TypeormLoaderMiddleware](README.md#typeormloadermiddleware)
- [directLoader](README.md#directloader)

## Variables

### CUSTOM_DATALOADER_EXTENSION_FIELD

• `Const` **CUSTOM_DATALOADER_EXTENSION_FIELD**: _CUSTOM_DATALOADER_EXTENSION_FIELD_= 'CUSTOM_DATALOADER_EXTENSION_FIELD'

Custom data loader extension data key for the field, that is stored inside the nestjs typestore. No different then @Extension decorator of nestjs for graphql, just a wrapper for types.

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/extension-field.constants.ts:11

---

### DATA_LOADER_CONTEXT_KEY

• `Const` **DATA_LOADER_CONTEXT_KEY**: _DATA_LOADER_CONTEXT_= 'DATA_LOADER_CONTEXT'

The context key of data-loader plugin per key injected by the interceptor or apollo-server plugin. This will be appended to the context instead of the request to ensure compatibility between two.

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/context.constants.ts:5

---

### TYPEORM_DATALOADER_EXTENSION_FIELD

• `Const` **TYPEORM_DATALOADER_EXTENSION_FIELD**: _TYPEORM_DATALOADER_EXTENSION_FIELD_= 'TYPEORM_DATALOADER_EXTENSION_FIELD'

Typeorm data loader extension data key for the field, that is stored inside the nestjs typestore. No different then @Extension decorator of nestjs for graphql, just a wrapper for types.

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/extension-field.constants.ts:5

## Functions

### CustomLoaderExtension

▸ **CustomLoaderExtension**<K, V, C\>(`batchLoadFn`: _BatchLoadFn_<K, V\>, `options?`: _DataLoader.Options_<K, V, C\>): MethodDecorator & PropertyDecorator

Add data required for a given field or field-resolver for custom dataloader. This will pass in a new instance of data loader to batch your function, to the field-resolver itself.

#### Type parameters:

| Name | Default |
| :--- | :------ |
| `K`  | -       |
| `V`  | -       |
| `C`  | K       |

#### Parameters:

| Name          | Type                           |
| :------------ | :----------------------------- |
| `batchLoadFn` | _BatchLoadFn_<K, V\>           |
| `options?`    | _DataLoader.Options_<K, V, C\> |

**Returns:** MethodDecorator & PropertyDecorator

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/decorators/custom-loader.decorator.ts:12

---

### CustomLoaderMiddleware

▸ `Const`**CustomLoaderMiddleware**(`ctx`: _MiddlewareContext_<any, {}, { [argName: string]: _any_; }\>, `next`: _NextFn_<any\>): _any_

This middleware checks and processes for the subfields of a parent entity that should be resolved by the data loader. It will automatically run the function that is embedded inside the DATA_LOADER extension field.

#### Parameters:

| Name   | Type                                                         |
| :----- | :----------------------------------------------------------- |
| `ctx`  | _MiddlewareContext_<any, {}, { [argName: string]: _any_; }\> |
| `next` | _NextFn_<any\>                                               |

**Returns:** _any_

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/middleware/custom-loader.middleware.ts:14

---

### TypeormLoaderExtension

▸ **TypeormLoaderExtension**(`keyFunc`: KeyFunc, `options?`: TypeormLoaderOptions): MethodDecorator & PropertyDecorator

Add data required for a given field or field-resolver for typeorm dataloader. This will automatically parse and create a dataloader complying to setup in this field.

#### Parameters:

| Name       | Type                 |
| :--------- | :------------------- |
| `keyFunc`  | KeyFunc              |
| `options?` | TypeormLoaderOptions |

**Returns:** MethodDecorator & PropertyDecorator

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/decorators/typeorm-loader.decorator.ts:12

---

### TypeormLoaderMiddleware

▸ `Const`**TypeormLoaderMiddleware**(`ctx`: _MiddlewareContext_<any, {}, { [argName: string]: _any_; }\>, `next`: _NextFn_<any\>): _any_

This middleware checks and processes for the subfields of a parent entity that should be resolved by the data loader. It will automatically parse the subfield with the given decorator according to the relation type given.

#### Parameters:

| Name   | Type                                                         |
| :----- | :----------------------------------------------------------- |
| `ctx`  | _MiddlewareContext_<any, {}, { [argName: string]: _any_; }\> |
| `next` | _NextFn_<any\>                                               |

**Returns:** _any_

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/middleware/typeorm-loader.middleware.ts:13

---

### directLoader

▸ **directLoader**<V\>(`relation`: RelationMetadata, `connection`: Connection, `grouper`: _string_ \| (`entity`: V) => _any_): _function_

A shared component for handling the end result of the query.

#### Type parameters:

| Name |
| :--- |
| `V`  |

#### Parameters:

| Name         | Type                               |
| :----------- | :--------------------------------- |
| `relation`   | RelationMetadata                   |
| `connection` | Connection                         |
| `grouper`    | _string_ \| (`entity`: V) => _any_ |

**Returns:** (`ids`: readonly _any_[]) => _Promise_<any\>

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/loaders/direct.loader.ts:8
