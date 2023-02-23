[@webundsoehne/nestjs-util](../README.md) / GlobalExceptionFilter

# Class: GlobalExceptionFilter

## Hierarchy

- **`GlobalExceptionFilter`**

  ↳ [`GlobalSentryExceptionFilter`](GlobalSentryExceptionFilter.md)

  ↳ [`BadRequestExceptionFilter`](BadRequestExceptionFilter.md)

## Implements

- `ExceptionFilter`

## Table of contents

### Constructors

- [constructor](GlobalExceptionFilter.md#constructor)

### Properties

- [logger](GlobalExceptionFilter.md#logger)

### Methods

- [catch](GlobalExceptionFilter.md#catch)
- [handleGraphQL](GlobalExceptionFilter.md#handlegraphql)
- [handleHttp](GlobalExceptionFilter.md#handlehttp)
- [handleRpc](GlobalExceptionFilter.md#handlerpc)
- [payload](GlobalExceptionFilter.md#payload)
- [shouldIgnore](GlobalExceptionFilter.md#shouldignore)
- [debug](GlobalExceptionFilter.md#debug)
- [defaultPayload](GlobalExceptionFilter.md#defaultpayload)
- [format](GlobalExceptionFilter.md#format)

## Constructors

### constructor

• **new GlobalExceptionFilter**()

## Properties

### logger

• `Protected` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:16

## Methods

### catch

▸ **catch**(`exception`, `host`): `void` \| `HttpException` \| `Observable`<`never`\>

#### Parameters

| Name        | Type            |
| :---------- | :-------------- |
| `exception` | `Error`         |
| `host`      | `ArgumentsHost` |

#### Returns

`void` \| `HttpException` \| `Observable`<`never`\>

#### Implementation of

ExceptionFilter.catch

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:61

---

### handleGraphQL

▸ `Protected` **handleGraphQL**(`payload`): `HttpException`

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `payload` | [`EnrichedExceptionError`](EnrichedExceptionError.md) |

#### Returns

`HttpException`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:124

---

### handleHttp

▸ `Protected` **handleHttp**(`payload`, `host`): `void`

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `payload` | [`EnrichedExceptionError`](EnrichedExceptionError.md) |
| `host`    | `ArgumentsHost`                                       |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:111

---

### handleRpc

▸ `Protected` **handleRpc**(`payload`): `Observable`<`never`\>

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `payload` | [`EnrichedExceptionError`](EnrichedExceptionError.md) |

#### Returns

`Observable`<`never`\>

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:128

---

### payload

▸ `Protected` **payload**(`exception?`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name         | Type    |
| :----------- | :------ |
| `exception?` | `Error` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:107

---

### shouldIgnore

▸ `Protected` **shouldIgnore**(`exception`): `boolean`

#### Parameters

| Name        | Type    |
| :---------- | :------ |
| `exception` | `Error` |

#### Returns

`boolean`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:97

---

### debug

▸ `Static` **debug**(`logger`, `payload`): `void`

#### Parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `logger`  | `Logger`                                                  |
| `payload` | [`EnrichedException`](../interfaces/EnrichedException.md) |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:51

---

### defaultPayload

▸ `Static` **defaultPayload**(`exception`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `exception` | `any` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:18

---

### format

▸ `Static` **format**(`error`): `string`

#### Parameters

| Name    | Type                |
| :------ | :------------------ |
| `error` | `string` \| `Error` |

#### Returns

`string`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:41
