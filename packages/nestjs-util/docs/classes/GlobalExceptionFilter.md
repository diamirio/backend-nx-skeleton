[@webundsoehne/nestjs-util](../README.md) / GlobalExceptionFilter

# Class: GlobalExceptionFilter

## Hierarchy

- **`GlobalExceptionFilter`**

  ↳ [`GlobalSentryExceptionFilter`](GlobalSentryExceptionFilter.md)

  ↳ [`BadRequestExceptionFilter`](BadRequestExceptionFilter.md)

## Implements

- `ExceptionFilter`

## Table of contents

### Constructors

- [constructor](GlobalExceptionFilter.md#constructor)

### Properties

- [logger](GlobalExceptionFilter.md#logger)

### Methods

- [catch](GlobalExceptionFilter.md#catch)
- [payload](GlobalExceptionFilter.md#payload)
- [defaultPayload](GlobalExceptionFilter.md#defaultpayload)

## Constructors

### constructor

• **new GlobalExceptionFilter**()

## Properties

### logger

• `Protected` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:11

## Methods

### catch

▸ **catch**(`exception`, `host`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `Error` |
| `host` | `ArgumentsHost` |

#### Returns

`void`

#### Implementation of

ExceptionFilter.catch

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:22

___

### payload

▸ `Protected` **payload**(`exception?`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception?` | `Error` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:47

___

### defaultPayload

▸ `Static` **defaultPayload**(`exception`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `any` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:13
