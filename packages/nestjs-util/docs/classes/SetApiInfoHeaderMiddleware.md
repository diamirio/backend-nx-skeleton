[@webundsoehne/nestjs-util](../README.md) / SetApiInfoHeaderMiddleware

# Class: SetApiInfoHeaderMiddleware

## Implements

- `NestMiddleware`

## Table of contents

### Constructors

- [constructor](SetApiInfoHeaderMiddleware.md#constructor)

### Methods

- [use](SetApiInfoHeaderMiddleware.md#use)

## Constructors

### constructor

• **new SetApiInfoHeaderMiddleware**()

## Methods

### use

▸ **use**(`_req`, `res`, `next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_req` | `FastifyRequest`<`RouteGenericInterface`, `Server`, `IncomingMessage`, `unknown`\> |
| `res` | `any` |
| `next` | () => `any` |

#### Returns

`void`

#### Implementation of

NestMiddleware.use

#### Defined in

packages/nestjs-util/src/middleware/info-header.ts:5
