[@webundsoehne/nestjs-util](../README.md) / [microservices](../modules/microservices.md) / RpcGlobalExceptionFilter

# Class: RpcGlobalExceptionFilter

[microservices](../modules/microservices.md).RpcGlobalExceptionFilter

## Implements

- `RpcExceptionFilter`

## Table of contents

### Constructors

- [constructor](microservices.RpcGlobalExceptionFilter.md#constructor)

### Properties

- [logger](microservices.RpcGlobalExceptionFilter.md#logger)

### Methods

- [catch](microservices.RpcGlobalExceptionFilter.md#catch)
- [payload](microservices.RpcGlobalExceptionFilter.md#payload)
- [defaultPayload](microservices.RpcGlobalExceptionFilter.md#defaultpayload)

## Constructors

### constructor

• **new RpcGlobalExceptionFilter**()

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/filter/rpc-global-exception.filter.ts:11

## Methods

### catch

▸ **catch**(`exception`, `host`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `HttpException` \| `RpcException` |
| `host` | `ArgumentsHost` |

#### Returns

`any`

#### Implementation of

RpcExceptionFilter.catch

#### Defined in

packages/nestjs-util/src/filter/rpc-global-exception.filter.ts:24

___

### payload

▸ `Protected` **payload**(`exception`, `host`): [`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `HttpException` \| `RpcException` |
| `host` | `ArgumentsHost` |

#### Returns

[`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/rpc-global-exception.filter.ts:32

___

### defaultPayload

▸ `Static` **defaultPayload**(`exception`, `host`): [`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `HttpException` \| `RpcException` |
| `host` | `ArgumentsHost` |

#### Returns

[`EnrichedException`](../interfaces/index.EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/rpc-global-exception.filter.ts:13
