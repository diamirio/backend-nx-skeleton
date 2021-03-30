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

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/extension-field.constants.ts:3

---

### DATA_LOADER_CONTEXT_KEY

• `Const` **DATA_LOADER_CONTEXT_KEY**: _DATA_LOADER_CONTEXT_= 'DATA_LOADER_CONTEXT'

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/context.constants.ts:1

---

### TYPEORM_DATALOADER_EXTENSION_FIELD

• `Const` **TYPEORM_DATALOADER_EXTENSION_FIELD**: _TYPEORM_DATALOADER_EXTENSION_FIELD_= 'TYPEORM_DATALOADER_EXTENSION_FIELD'

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/constants/extension-field.constants.ts:1

## Functions

### CustomLoaderExtension

▸ **CustomLoaderExtension**<K, V, C\>(`batchLoadFn`: _BatchLoadFn_<K, V\>, `options?`: _DataLoader.Options_<K, V, C\>): MethodDecorator & PropertyDecorator

Add data required for a given field or field-resolver for custom dataloader.

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

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/decorators/loader.decorator.ts:11

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

Add data required for a given field or field-resolver for typeorm dataloader.

#### Parameters:

| Name       | Type                 |
| :--------- | :------------------- |
| `keyFunc`  | KeyFunc              |
| `options?` | TypeormLoaderOptions |

**Returns:** MethodDecorator & PropertyDecorator

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/decorators/typeorm-loader.decorator.ts:11

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

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/loaders/direct.loader.ts:5
