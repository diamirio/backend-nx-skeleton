[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / MaintenanceMiddleware

# Class: MaintenanceMiddleware

[index](../modules/index.md).MaintenanceMiddleware

## Implements

- `NestMiddleware`

## Table of contents

### Constructors

- [constructor](index.MaintenanceMiddleware.md#constructor)

### Methods

- [use](index.MaintenanceMiddleware.md#use)

## Constructors

### constructor

• **new MaintenanceMiddleware**(`service`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`MaintenanceService`](index.MaintenanceService.md) |

#### Defined in

packages/nestjs-util/src/middleware/maintenance.ts:7

## Methods

### use

▸ **use**(`req`, `res`, `next`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `FastifyRequest`<`RouteGenericInterface`, `Server`, `IncomingMessage`\> |
| `res` | `any` |
| `next` | (`err?`: `any`) => `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

NestMiddleware.use

#### Defined in

packages/nestjs-util/src/middleware/maintenance.ts:9
