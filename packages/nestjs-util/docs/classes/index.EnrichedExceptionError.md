[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / EnrichedExceptionError

# Class: EnrichedExceptionError

[index](../modules/index.md).EnrichedExceptionError

Mostly required for making instanceof check of graphql valid after version 15.0.3

## Hierarchy

- `Error`

  ↳ **`EnrichedExceptionError`**

## Implements

- [`EnrichedException`](../interfaces/index.EnrichedException.md)

## Table of contents

### Constructors

- [constructor](index.EnrichedExceptionError.md#constructor)

### Properties

- [error](index.EnrichedExceptionError.md#error)
- [errors](index.EnrichedExceptionError.md#errors)
- [message](index.EnrichedExceptionError.md#message)
- [name](index.EnrichedExceptionError.md#name)
- [service](index.EnrichedExceptionError.md#service)
- [stack](index.EnrichedExceptionError.md#stack)
- [stacktrace](index.EnrichedExceptionError.md#stacktrace)
- [statusCode](index.EnrichedExceptionError.md#statuscode)
- [prepareStackTrace](index.EnrichedExceptionError.md#preparestacktrace)
- [stackTraceLimit](index.EnrichedExceptionError.md#stacktracelimit)

### Methods

- [captureStackTrace](index.EnrichedExceptionError.md#capturestacktrace)

## Constructors

### constructor

• **new EnrichedExceptionError**(`error`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`EnrichedException`](../interfaces/index.EnrichedException.md) |

#### Overrides

Error.constructor

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:23

## Properties

### error

• **error**: `string`

#### Implementation of

[EnrichedException](../interfaces/index.EnrichedException.md).[error](../interfaces/index.EnrichedException.md#error)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:17

___

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](../interfaces/index.ClassValidatorError.md)[]

#### Implementation of

[EnrichedException](../interfaces/index.EnrichedException.md).[errors](../interfaces/index.EnrichedException.md#errors)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:19

___

### message

• **message**: `string`

#### Implementation of

[EnrichedException](../interfaces/index.EnrichedException.md).[message](../interfaces/index.EnrichedException.md#message)

#### Overrides

Error.message

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:18

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### service

• `Optional` **service**: `string`[]

#### Implementation of

[EnrichedException](../interfaces/index.EnrichedException.md).[service](../interfaces/index.EnrichedException.md#service)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:20

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### stacktrace

• `Optional` **stacktrace**: `string`

#### Implementation of

[EnrichedException](../interfaces/index.EnrichedException.md).[stacktrace](../interfaces/index.EnrichedException.md#stacktrace)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:21

___

### statusCode

• **statusCode**: `HttpStatus`

#### Implementation of

[EnrichedException](../interfaces/index.EnrichedException.md).[statusCode](../interfaces/index.EnrichedException.md#statuscode)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:16

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
