[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / CacheLifetimeHelperInterceptor

# Class: CacheLifetimeHelperInterceptor

[index](../modules/index.md).CacheLifetimeHelperInterceptor

## Implements

- `NestInterceptor`

## Table of contents

### Constructors

- [constructor](index.CacheLifetimeHelperInterceptor.md#constructor)

### Properties

- [logger](index.CacheLifetimeHelperInterceptor.md#logger)
- [options](index.CacheLifetimeHelperInterceptor.md#options)

### Methods

- [getOptionsFromConfig](index.CacheLifetimeHelperInterceptor.md#getoptionsfromconfig)
- [intercept](index.CacheLifetimeHelperInterceptor.md#intercept)

## Constructors

### constructor

• **new CacheLifetimeHelperInterceptor**()

#### Defined in

packages/nestjs-util/src/interceptor/cache-lifetime.interceptor.ts:13

## Properties

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/interceptor/cache-lifetime.interceptor.ts:10

___

### options

• `Private` `Readonly` **options**: [`CacheLifetimeOptions`](../interfaces/index.CacheLifetimeOptions.md)

#### Defined in

packages/nestjs-util/src/interceptor/cache-lifetime.interceptor.ts:11

## Methods

### getOptionsFromConfig

▸ **getOptionsFromConfig**(`cacheLifetimeOptions?`): [`CacheLifetimeOptions`](../interfaces/index.CacheLifetimeOptions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheLifetimeOptions?` | [`CacheLifetimeOptions`](../interfaces/index.CacheLifetimeOptions.md) |

#### Returns

[`CacheLifetimeOptions`](../interfaces/index.CacheLifetimeOptions.md)

#### Defined in

packages/nestjs-util/src/interceptor/cache-lifetime.interceptor.ts:18

___

### intercept

▸ **intercept**(`context`, `next`): `Observable`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |
| `next` | `CallHandler`<`any`\> |

#### Returns

`Observable`<`any`\>

#### Implementation of

NestInterceptor.intercept

#### Defined in

packages/nestjs-util/src/interceptor/cache-lifetime.interceptor.ts:24
