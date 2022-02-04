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

packages/nestjs-util/src/filter/exception.interface.ts:34

___

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](ClassValidatorError.md)[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:36

___

### message

• **message**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:35

___

### service

• `Optional` **service**: `string`[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:37

___

### stacktrace

• `Optional` **stacktrace**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:38

___

### statusCode

• **statusCode**: `HttpStatus`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:33
