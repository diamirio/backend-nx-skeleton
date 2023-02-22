[@webundsoehne/nestjs-util](../README.md) / EnrichedException

# Interface: EnrichedException

## Implemented by

- [`EnrichedExceptionError`](../classes/EnrichedExceptionError.md)

## Table of contents

### Properties

- [cause](EnrichedException.md#cause)
- [code](EnrichedException.md#code)
- [error](EnrichedException.md#error)
- [errors](EnrichedException.md#errors)
- [message](EnrichedException.md#message)
- [service](EnrichedException.md#service)
- [stacktrace](EnrichedException.md#stacktrace)
- [statusCode](EnrichedException.md#statuscode)

## Properties

### cause

• `Optional` **cause**: `string` \| `Error`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:9

---

### code

• `Optional` **code**: `string`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:15

---

### error

• **error**: `string` \| `Error`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:7

---

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](ClassValidatorError.md)[]

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:12

---

### message

• **message**: `string`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:8

---

### service

• `Optional` **service**: `string`[]

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:18

---

### stacktrace

• `Optional` **stacktrace**: `string`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:21

---

### statusCode

• **statusCode**: `HttpStatus`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:6
