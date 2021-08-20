[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / GlobalExceptionFilter

# Class: GlobalExceptionFilter

[index](../modules/index.md).GlobalExceptionFilter

## Hierarchy

- **`GlobalExceptionFilter`**

  ↳ [`BadRequestExceptionFilter`](index.BadRequestExceptionFilter.md)

## Implements

- `ExceptionFilter`

## Table of contents

### Constructors

- [constructor](index.GlobalExceptionFilter.md#constructor)

### Properties

- [logger](index.GlobalExceptionFilter.md#logger)

### Methods

- [catch](index.GlobalExceptionFilter.md#catch)
- [payload](index.GlobalExceptionFilter.md#payload)
- [defaultPayload](index.GlobalExceptionFilter.md#defaultpayload)

## Constructors

### constructor

• **new GlobalExceptionFilter**(`httpAdapterHost`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `httpAdapterHost` | `HttpAdapterHost`<`AbstractHttpAdapter`<`any`, `any`, `any`\>\> |

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:12

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:10

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

packages/nestjs-util/src/filter/global-exception.filter.ts:23

___

### payload

▸ `Protected` **payload**(`exception?`): [`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception?` | `Error` |

#### Returns

[`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:43

___

### defaultPayload

▸ `Static` **defaultPayload**(`exception`): [`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `any` |

#### Returns

[`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:14
