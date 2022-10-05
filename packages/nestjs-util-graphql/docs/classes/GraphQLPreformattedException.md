[@webundsoehne/nestjs-util-graphql](../README.md) / GraphQLPreformattedException

# Class: GraphQLPreformattedException<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

## Hierarchy

- `Error`

  ↳ **`GraphQLPreformattedException`**

## Implements

- `GraphQLFormattedError`

## Table of contents

### Constructors

- [constructor](GraphQLPreformattedException.md#constructor)

### Properties

- [extensions](GraphQLPreformattedException.md#extensions)
- [locations](GraphQLPreformattedException.md#locations)
- [message](GraphQLPreformattedException.md#message)
- [name](GraphQLPreformattedException.md#name)
- [path](GraphQLPreformattedException.md#path)
- [stack](GraphQLPreformattedException.md#stack)
- [prepareStackTrace](GraphQLPreformattedException.md#preparestacktrace)
- [stackTraceLimit](GraphQLPreformattedException.md#stacktracelimit)

### Methods

- [captureStackTrace](GraphQLPreformattedException.md#capturestacktrace)

## Constructors

### constructor

• **new GraphQLPreformattedException**<`T`\>(`error`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`ExtendedGraphQLFormattedError`](../README.md#extendedgraphqlformattederror)<`T`\> |

#### Overrides

Error.constructor

#### Defined in

packages/nestjs-util-graphql/src/filter/graphql-exception.interface.ts:8

## Properties

### extensions

• **extensions**: `T`

#### Implementation of

GraphQLFormattedError.extensions

#### Defined in

packages/nestjs-util-graphql/src/filter/graphql-exception.interface.ts:6

___

### locations

• **locations**: readonly `SourceLocation`[]

#### Implementation of

GraphQLFormattedError.locations

#### Defined in

packages/nestjs-util-graphql/src/filter/graphql-exception.interface.ts:4

___

### message

• **message**: `string`

#### Implementation of

GraphQLFormattedError.message

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1041

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1040

___

### path

• **path**: readonly (`string` \| `number`)[]

#### Implementation of

GraphQLFormattedError.path

#### Defined in

packages/nestjs-util-graphql/src/filter/graphql-exception.interface.ts:5

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1042

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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

node_modules/@types/node/ts4.8/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:13

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

node_modules/@types/node/ts4.8/globals.d.ts:4
