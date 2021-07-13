[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / EnrichedException

# Interface: EnrichedException

[index](../modules/index.md).EnrichedException

## Implemented by

- [`EnrichedExceptionError`](../classes/index.EnrichedExceptionError.md)

## Table of contents

### Properties

- [error](index.EnrichedException.md#error)
- [errors](index.EnrichedException.md#errors)
- [message](index.EnrichedException.md#message)
- [service](index.EnrichedException.md#service)
- [stacktrace](index.EnrichedException.md#stacktrace)
- [statusCode](index.EnrichedException.md#statuscode)

## Properties

### error

• **error**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:31

___

### errors

• `Optional` **errors**: `string`[] \| [`ClassValidatorError`](index.ClassValidatorError.md)[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:33

___

### message

• **message**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:32

___

### service

• `Optional` **service**: `string`[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:34

___

### stacktrace

• `Optional` **stacktrace**: `string`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:35

___

### statusCode

• **statusCode**: `HttpStatus`

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:30
