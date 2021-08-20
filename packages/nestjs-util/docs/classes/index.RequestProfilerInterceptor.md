[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / RequestProfilerInterceptor

# Class: RequestProfilerInterceptor

[index](../modules/index.md).RequestProfilerInterceptor

## Implements

- `NestInterceptor`

## Table of contents

### Constructors

- [constructor](index.RequestProfilerInterceptor.md#constructor)

### Properties

- [logger](index.RequestProfilerInterceptor.md#logger)

### Methods

- [intercept](index.RequestProfilerInterceptor.md#intercept)
- [requestProfilerLog](index.RequestProfilerInterceptor.md#requestprofilerlog)

## Constructors

### constructor

• **new RequestProfilerInterceptor**()

## Properties

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/interceptor/request-profiler.interceptor.ts:9

## Methods

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

packages/nestjs-util/src/interceptor/request-profiler.interceptor.ts:19

___

### requestProfilerLog

▸ **requestProfilerLog**(`context`, `method`, `url`, `start`, `end`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |
| `method` | `string` |
| `url` | `string` |
| `start` | `number` |
| `end` | `number` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/interceptor/request-profiler.interceptor.ts:11
