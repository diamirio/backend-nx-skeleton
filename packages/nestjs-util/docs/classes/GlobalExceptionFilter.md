[@webundsoehne/nestjs-util](../README.md) / GlobalExceptionFilter

# Class: GlobalExceptionFilter

## Hierarchy

- **`GlobalExceptionFilter`**

  ↳ [`GlobalSentryExceptionFilter`](GlobalSentryExceptionFilter.md)

  ↳ [`BadRequestExceptionFilter`](BadRequestExceptionFilter.md)

## Implements

- `ExceptionFilter`
- `GqlExceptionFilter`

## Table of contents

### Constructors

- [constructor](GlobalExceptionFilter.md#constructor)

### Properties

- [logger](GlobalExceptionFilter.md#logger)

### Methods

- [catch](GlobalExceptionFilter.md#catch)
- [handleGraphQL](GlobalExceptionFilter.md#handlegraphql)
- [handleHttp](GlobalExceptionFilter.md#handlehttp)
- [payload](GlobalExceptionFilter.md#payload)
- [shouldIgnore](GlobalExceptionFilter.md#shouldignore)
- [debug](GlobalExceptionFilter.md#debug)
- [defaultPayload](GlobalExceptionFilter.md#defaultpayload)
- [formatMessage](GlobalExceptionFilter.md#formatmessage)

## Constructors

### constructor

• **new GlobalExceptionFilter**()

## Properties

### logger

• `Protected` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:14

## Methods

### catch

▸ **catch**(`exception`, `host`): `void` \| `HttpException`

#### Parameters

| Name        | Type            |
| :---------- | :-------------- |
| `exception` | `Error`         |
| `host`      | `ArgumentsHost` |

#### Returns

`void` \| `HttpException`

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

packages/nestjs-util/src/filter/global-exception.filter.ts:112

---

### handleHttp

▸ `Protected` **handleHttp**(`host`, `payload`): `void`

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `host`    | `ArgumentsHost`                                       |
| `payload` | [`EnrichedExceptionError`](EnrichedExceptionError.md) |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:99

---

### payload

▸ `Protected` **payload**(`exception?`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name         | Type  |
| :----------- | :---- |
| `exception?` | `any` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:95

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

packages/nestjs-util/src/filter/global-exception.filter.ts:85

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

packages/nestjs-util/src/filter/global-exception.filter.ts:16

---

### formatMessage

▸ `Static` **formatMessage**(`error`): `string`

#### Parameters

| Name    | Type                |
| :------ | :------------------ |
| `error` | `string` \| `Error` |

#### Returns

`string`

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:39
