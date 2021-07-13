[@webundsoehne/nestjs-util](../README.md) / [graphql](../modules/graphql.md) / GraphQLPreformattedException

# Class: GraphQLPreformattedException<T\>

[graphql](../modules/graphql.md).GraphQLPreformattedException

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Error`

  ↳ **`GraphQLPreformattedException`**

## Implements

- `GraphQLFormattedError`<`T`\>

## Table of contents

### Constructors

- [constructor](graphql.GraphQLPreformattedException.md#constructor)

### Properties

- [extensions](graphql.GraphQLPreformattedException.md#extensions)
- [locations](graphql.GraphQLPreformattedException.md#locations)
- [message](graphql.GraphQLPreformattedException.md#message)
- [name](graphql.GraphQLPreformattedException.md#name)
- [path](graphql.GraphQLPreformattedException.md#path)
- [stack](graphql.GraphQLPreformattedException.md#stack)
- [prepareStackTrace](graphql.GraphQLPreformattedException.md#preparestacktrace)
- [stackTraceLimit](graphql.GraphQLPreformattedException.md#stacktracelimit)

### Methods

- [captureStackTrace](graphql.GraphQLPreformattedException.md#capturestacktrace)

## Constructors

### constructor

• **new GraphQLPreformattedException**<`T`\>(`error`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `GraphQLFormattedError`<`T`\> |

#### Overrides

Error.constructor

#### Defined in

packages/nestjs-util/src/filter/graphql-exception.interface.ts:8

## Properties

### extensions

• **extensions**: `T`

#### Implementation of

GraphQLFormattedError.extensions

#### Defined in

packages/nestjs-util/src/filter/graphql-exception.interface.ts:6

___

### locations

• **locations**: readonly `SourceLocation`[]

#### Implementation of

GraphQLFormattedError.locations

#### Defined in

packages/nestjs-util/src/filter/graphql-exception.interface.ts:4

___

### message

• **message**: `string`

#### Implementation of

GraphQLFormattedError.message

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### path

• **path**: readonly (`string` \| `number`)[]

#### Implementation of

GraphQLFormattedError.path

#### Defined in

packages/nestjs-util/src/filter/graphql-exception.interface.ts:5

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:4
