[@webundsoehne/nestjs-util-restful](../README.md) / RequestProfilerInterceptor

# Class: RequestProfilerInterceptor

## Implements

- `NestInterceptor`

## Table of contents

### Constructors

- [constructor](RequestProfilerInterceptor.md#constructor)

### Properties

- [logger](RequestProfilerInterceptor.md#logger)

### Methods

- [intercept](RequestProfilerInterceptor.md#intercept)
- [requestProfilerLog](RequestProfilerInterceptor.md#requestprofilerlog)

## Constructors

### constructor

• **new RequestProfilerInterceptor**()

## Properties

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

interceptor/request-profiler.interceptor.ts:10

## Methods

### intercept

▸ **intercept**(`context`, `next`): `Observable`<`any`\>

#### Parameters

| Name      | Type                  |
| :-------- | :-------------------- |
| `context` | `ExecutionContext`    |
| `next`    | `CallHandler`<`any`\> |

#### Returns

`Observable`<`any`\>

#### Implementation of

NestInterceptor.intercept

#### Defined in

interceptor/request-profiler.interceptor.ts:26

---

### requestProfilerLog

▸ **requestProfilerLog**(`context`, `method`, `url`, `start`, `end`): `void`

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |
| `method`  | `string`           |
| `url`     | `string`           |
| `start`   | `number`           |
| `end`     | `number`           |

#### Returns

`void`

#### Defined in

interceptor/request-profiler.interceptor.ts:12
