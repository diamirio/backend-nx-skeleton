[@webundsoehne/nestjs-util](../README.md) / EnrichedExceptionError

# Class: EnrichedExceptionError

Mostly required for making instanceof check of graphql valid after version 15.0.3

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
- [service](EnrichedExceptionError.md#service)
- [stacktrace](EnrichedExceptionError.md#stacktrace)
- [statusCode](EnrichedExceptionError.md#statuscode)

## Constructors

### constructor

• **new EnrichedExceptionError**(`error`)

#### Parameters

| Name    | Type                                                      |
| :------ | :-------------------------------------------------------- |
| `error` | [`EnrichedException`](../interfaces/EnrichedException.md) |

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:17

## Properties

### cause

• `Optional` **cause**: `Error`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[cause](../interfaces/EnrichedException.md#cause)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:12

---

### error

• **error**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[error](../interfaces/EnrichedException.md#error)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:10

---

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](../interfaces/ClassValidatorError.md)[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[errors](../interfaces/EnrichedException.md#errors)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:13

---

### message

• **message**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[message](../interfaces/EnrichedException.md#message)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:11

---

### service

• `Optional` **service**: `string`[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[service](../interfaces/EnrichedException.md#service)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:14

---

### stacktrace

• `Optional` **stacktrace**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[stacktrace](../interfaces/EnrichedException.md#stacktrace)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:15

---

### statusCode

• **statusCode**: `HttpStatus`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[statusCode](../interfaces/EnrichedException.md#statuscode)

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:9
