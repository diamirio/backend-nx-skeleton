[@webundsoehne/nestjs-util](../README.md) / EnrichedException

# Interface: EnrichedException

## Implemented by

- [`EnrichedExceptionError`](../classes/EnrichedExceptionError.md)

## Table of contents

### Properties

- [error](EnrichedException.md#error)
- [errors](EnrichedException.md#errors)
- [message](EnrichedException.md#message)
- [service](EnrichedException.md#service)
- [stacktrace](EnrichedException.md#stacktrace)
- [statusCode](EnrichedException.md#statuscode)

## Properties

### error

• **error**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:32

---

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](ClassValidatorError.md)[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:34

---

### message

• **message**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:33

---

### service

• `Optional` **service**: `string`[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:35

---

### stacktrace

• `Optional` **stacktrace**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:36

---

### statusCode

• **statusCode**: `HttpStatus`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:31
