[@webundsoehne/nestjs-util-restful](../README.md) / CacheLifetimeHelperInterceptor

# Class: CacheLifetimeHelperInterceptor

## Implements

- `NestInterceptor`

## Table of contents

### Constructors

- [constructor](CacheLifetimeHelperInterceptor.md#constructor)

### Properties

- [logger](CacheLifetimeHelperInterceptor.md#logger)
- [options](CacheLifetimeHelperInterceptor.md#options)

### Methods

- [getOptionsFromConfig](CacheLifetimeHelperInterceptor.md#getoptionsfromconfig)
- [intercept](CacheLifetimeHelperInterceptor.md#intercept)

## Constructors

### constructor

• **new CacheLifetimeHelperInterceptor**()

#### Defined in

interceptor/cache-lifetime.interceptor.ts:15

## Properties

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

interceptor/cache-lifetime.interceptor.ts:12

___

### options

• `Private` `Readonly` **options**: `CacheLifetimeOptions`

#### Defined in

interceptor/cache-lifetime.interceptor.ts:13

## Methods

### getOptionsFromConfig

▸ **getOptionsFromConfig**(`cacheLifetimeOptions?`): `CacheLifetimeOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheLifetimeOptions?` | `CacheLifetimeOptions` |

#### Returns

`CacheLifetimeOptions`

#### Defined in

interceptor/cache-lifetime.interceptor.ts:20

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

interceptor/cache-lifetime.interceptor.ts:24
