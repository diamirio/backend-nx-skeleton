[@webundsoehne/nestjs-util](../README.md) / EnrichedExceptionError

# Class: EnrichedExceptionError

Mostly required for making instanceof check of graphql valid after version 15.0.3

## Hierarchy

- `Error`

  ↳ **`EnrichedExceptionError`**

## Implements

- [`EnrichedException`](../interfaces/EnrichedException.md)

## Table of contents

### Constructors

- [constructor](EnrichedExceptionError.md#constructor)

### Properties

- [cause](EnrichedExceptionError.md#cause)
- [error](EnrichedExceptionError.md#error)
- [errors](EnrichedExceptionError.md#errors)
- [message](EnrichedExceptionError.md#message)
- [name](EnrichedExceptionError.md#name)
- [service](EnrichedExceptionError.md#service)
- [stack](EnrichedExceptionError.md#stack)
- [stacktrace](EnrichedExceptionError.md#stacktrace)
- [statusCode](EnrichedExceptionError.md#statuscode)
- [prepareStackTrace](EnrichedExceptionError.md#preparestacktrace)
- [stackTraceLimit](EnrichedExceptionError.md#stacktracelimit)

### Methods

- [captureStackTrace](EnrichedExceptionError.md#capturestacktrace)

## Constructors

### constructor

• **new EnrichedExceptionError**(`error`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`EnrichedException`](../interfaces/EnrichedException.md) |

#### Overrides

Error.constructor

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:25

## Properties

### cause

• `Optional` **cause**: `Error`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### error

• **error**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[error](../interfaces/EnrichedException.md#error)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:19

___

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](../interfaces/ClassValidatorError.md)[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[errors](../interfaces/EnrichedException.md#errors)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:21

___

### message

• **message**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[message](../interfaces/EnrichedException.md#message)

#### Overrides

Error.message

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:20

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### service

• `Optional` **service**: `string`[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[service](../interfaces/EnrichedException.md#service)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:22

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### stacktrace

• `Optional` **stacktrace**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[stacktrace](../interfaces/EnrichedException.md#stacktrace)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:23

___

### statusCode

• **statusCode**: `HttpStatus`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[statusCode](../interfaces/EnrichedException.md#statuscode)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:18

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

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

node_modules/@types/node/globals.d.ts:4
