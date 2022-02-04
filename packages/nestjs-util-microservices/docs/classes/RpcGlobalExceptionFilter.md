[@webundsoehne/nestjs-util-microservices](../README.md) / RpcGlobalExceptionFilter

# Class: RpcGlobalExceptionFilter

## Implements

- `RpcExceptionFilter`

## Table of contents

### Constructors

- [constructor](RpcGlobalExceptionFilter.md#constructor)

### Properties

- [logger](RpcGlobalExceptionFilter.md#logger)

### Methods

- [catch](RpcGlobalExceptionFilter.md#catch)
- [payload](RpcGlobalExceptionFilter.md#payload)
- [defaultPayload](RpcGlobalExceptionFilter.md#defaultpayload)

## Constructors

### constructor

• **new RpcGlobalExceptionFilter**()

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

packages/nestjs-util-microservices/src/filter/rpc-global-exception.filter.ts:12

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

packages/nestjs-util-microservices/src/filter/rpc-global-exception.filter.ts:25

___

### payload

▸ `Protected` **payload**(`exception`, `host`): `EnrichedException`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `HttpException` \| `RpcException` |
| `host` | `ArgumentsHost` |

#### Returns

`EnrichedException`

#### Defined in

packages/nestjs-util-microservices/src/filter/rpc-global-exception.filter.ts:33

___

### defaultPayload

▸ `Static` **defaultPayload**(`exception`, `host`): `EnrichedException`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `HttpException` \| `RpcException` |
| `host` | `ArgumentsHost` |

#### Returns

`EnrichedException`

#### Defined in

packages/nestjs-util-microservices/src/filter/rpc-global-exception.filter.ts:14
