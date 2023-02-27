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

| Name    | Type                                                                         |
| :------ | :--------------------------------------------------------------------------- |
| `error` | `Omit`<[`EnrichedException`](../interfaces/EnrichedException.md), `"name"`\> |

#### Overrides

Error.constructor

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:36

## Properties

### cause

• `Optional` **cause**: `string` \| `Error`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[cause](../interfaces/EnrichedException.md#cause)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:31

---

### error

• **error**: `string` \| `Error`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[error](../interfaces/EnrichedException.md#error)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:29

---

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](../interfaces/ClassValidatorError.md)[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[errors](../interfaces/EnrichedException.md#errors)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:32

---

### message

• **message**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[message](../interfaces/EnrichedException.md#message)

#### Overrides

Error.message

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:30

---

### name

• **name**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[name](../interfaces/EnrichedException.md#name)

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1040

---

### service

• `Optional` **service**: `string`[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[service](../interfaces/EnrichedException.md#service)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:33

---

### stack

• `Optional` **stack**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[stack](../interfaces/EnrichedException.md#stack)

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1042

---

### stacktrace

• `Optional` **stacktrace**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[stacktrace](../interfaces/EnrichedException.md#stacktrace)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:34

---

### statusCode

• **statusCode**: `HttpStatus`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[statusCode](../interfaces/EnrichedException.md#statuscode)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:28

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:11

---

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

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:4
