[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / BadRequestExceptionFilter

# Class: BadRequestExceptionFilter

[index](../modules/index.md).BadRequestExceptionFilter

## Hierarchy

- [`GlobalExceptionFilter`](index.GlobalExceptionFilter.md)

  ↳ **`BadRequestExceptionFilter`**

## Table of contents

### Constructors

- [constructor](index.BadRequestExceptionFilter.md#constructor)

### Methods

- [catch](index.BadRequestExceptionFilter.md#catch)
- [payload](index.BadRequestExceptionFilter.md#payload)
- [defaultPayload](index.BadRequestExceptionFilter.md#defaultpayload)

## Constructors

### constructor

• **new BadRequestExceptionFilter**(`httpAdapterHost`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `httpAdapterHost` | `HttpAdapterHost`<`AbstractHttpAdapter`<`any`, `any`, `any`\>\> |

#### Inherited from

[GlobalExceptionFilter](index.GlobalExceptionFilter.md).[constructor](index.GlobalExceptionFilter.md#constructor)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:12

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

#### Inherited from

[GlobalExceptionFilter](index.GlobalExceptionFilter.md).[catch](index.GlobalExceptionFilter.md#catch)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:23

___

### payload

▸ `Protected` **payload**(`exception`): [`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `BadRequestException` |

#### Returns

[`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Overrides

[GlobalExceptionFilter](index.GlobalExceptionFilter.md).[payload](index.GlobalExceptionFilter.md#payload)

#### Defined in

packages/nestjs-util/src/filter/bad-request-exception.filter.ts:9

___

### defaultPayload

▸ `Static` **defaultPayload**(`exception`): [`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `any` |

#### Returns

[`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Inherited from

[GlobalExceptionFilter](index.GlobalExceptionFilter.md).[defaultPayload](index.GlobalExceptionFilter.md#defaultpayload)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:14
