[@webundsoehne/nestjs-util](../README.md) / MaintenanceMiddleware

# Class: MaintenanceMiddleware

## Implements

- `NestMiddleware`

## Table of contents

### Constructors

- [constructor](MaintenanceMiddleware.md#constructor)

### Methods

- [use](MaintenanceMiddleware.md#use)

## Constructors

### constructor

• **new MaintenanceMiddleware**(`service`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`MaintenanceService`](MaintenanceService.md) |

#### Defined in

packages/nestjs-util/src/middleware/maintenance.ts:8

## Methods

### use

▸ **use**(`_req`, `_res`, `next`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_req` | `FastifyRequest`<`RouteGenericInterface`, `Server`, `IncomingMessage`, `FastifySchema`, `FastifyTypeProviderDefault`, `unknown`, `FastifyBaseLogger`, `ResolveFastifyRequestType`<`FastifyTypeProviderDefault`, `FastifySchema`, `RouteGenericInterface`\>\> |
| `_res` | `FastifyReply`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`, `FastifyTypeProviderDefault`, `unknown`\> |
| `next` | (`err?`: `any`) => `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

NestMiddleware.use

#### Defined in

packages/nestjs-util/src/middleware/maintenance.ts:10
