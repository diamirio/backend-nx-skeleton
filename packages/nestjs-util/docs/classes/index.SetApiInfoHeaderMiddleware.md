[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / SetApiInfoHeaderMiddleware

# Class: SetApiInfoHeaderMiddleware

[index](../modules/index.md).SetApiInfoHeaderMiddleware

## Implements

- `NestMiddleware`

## Table of contents

### Constructors

- [constructor](index.SetApiInfoHeaderMiddleware.md#constructor)

### Methods

- [use](index.SetApiInfoHeaderMiddleware.md#use)

## Constructors

### constructor

• **new SetApiInfoHeaderMiddleware**()

## Methods

### use

▸ **use**(`req`, `res`, `next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `FastifyRequest`<`RouteGenericInterface`, `Server`, `IncomingMessage`\> |
| `res` | `any` |
| `next` | () => `any` |

#### Returns

`void`

#### Implementation of

NestMiddleware.use

#### Defined in

packages/nestjs-util/src/middleware/info-header.ts:5
