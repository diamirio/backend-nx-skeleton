[@webundsoehne/nestjs-util](../README.md) / EnrichedExceptionError

# Class: EnrichedExceptionError

Mostly required for making instanceof check of graphql valid after version 15.0.3

## Implements

- [`EnrichedException`](../interfaces/EnrichedException.md)

## Table of contents

### Constructors

- [constructor](EnrichedExceptionError.md#constructor)

### Properties

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

packages/nestjs-util/src/filter/exception.interface.ts:25

## Properties

### error

• **error**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[error](../interfaces/EnrichedException.md#error)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:19

---

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](../interfaces/ClassValidatorError.md)[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[errors](../interfaces/EnrichedException.md#errors)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:21

---

### message

• **message**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[message](../interfaces/EnrichedException.md#message)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:20

---

### service

• `Optional` **service**: `string`[]

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[service](../interfaces/EnrichedException.md#service)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:22

---

### stacktrace

• `Optional` **stacktrace**: `string`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[stacktrace](../interfaces/EnrichedException.md#stacktrace)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:23

---

### statusCode

• **statusCode**: `HttpStatus`

#### Implementation of

[EnrichedException](../interfaces/EnrichedException.md).[statusCode](../interfaces/EnrichedException.md#statuscode)

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:18
