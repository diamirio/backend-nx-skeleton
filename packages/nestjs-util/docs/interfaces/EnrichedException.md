[@webundsoehne/nestjs-util](../README.md) / EnrichedException

# Interface: EnrichedException

## Implemented by

- [`EnrichedExceptionError`](../classes/EnrichedExceptionError.md)

## Table of contents

### Properties

- [cause](EnrichedException.md#cause)
- [error](EnrichedException.md#error)
- [errors](EnrichedException.md#errors)
- [message](EnrichedException.md#message)
- [service](EnrichedException.md#service)
- [stacktrace](EnrichedException.md#stacktrace)
- [statusCode](EnrichedException.md#statuscode)

## Properties

### cause

• `Optional` **cause**: `Error`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:26

---

### error

• **error**: `string`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:24

---

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](ClassValidatorError.md)[]

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:27

---

### message

• **message**: `string`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:25

---

### service

• `Optional` **service**: `string`[]

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:28

---

### stacktrace

• `Optional` **stacktrace**: `string`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:29

---

### statusCode

• **statusCode**: `HttpStatus`

#### Defined in

packages/nestjs-util/src/filter/interface/enriched-exception.interface.ts:23
