[@webundsoehne/nestjs-util](../README.md) / GlobalSentryExceptionFilter

# Class: GlobalSentryExceptionFilter

## Hierarchy

- [`GlobalExceptionFilter`](GlobalExceptionFilter.md)

  ↳ **`GlobalSentryExceptionFilter`**

## Implements

- `ExceptionFilter`
- `OnApplicationShutdown`

## Table of contents

### Constructors

- [constructor](GlobalSentryExceptionFilter.md#constructor)

### Properties

- [initialized](GlobalSentryExceptionFilter.md#initialized)
- [logger](GlobalSentryExceptionFilter.md#logger)
- [options](GlobalSentryExceptionFilter.md#options)
- [sentry](GlobalSentryExceptionFilter.md#sentry)

### Methods

- [catch](GlobalSentryExceptionFilter.md#catch)
- [handleGraphQL](GlobalSentryExceptionFilter.md#handlegraphql)
- [handleHttp](GlobalSentryExceptionFilter.md#handlehttp)
- [onApplicationShutdown](GlobalSentryExceptionFilter.md#onapplicationshutdown)
- [payload](GlobalSentryExceptionFilter.md#payload)
- [shouldIgnore](GlobalSentryExceptionFilter.md#shouldignore)
- [debug](GlobalSentryExceptionFilter.md#debug)
- [defaultPayload](GlobalSentryExceptionFilter.md#defaultpayload)
- [formatMessage](GlobalSentryExceptionFilter.md#formatmessage)

## Constructors

### constructor

• **new GlobalSentryExceptionFilter**()

#### Overrides

[GlobalExceptionFilter](GlobalExceptionFilter.md).[constructor](GlobalExceptionFilter.md#constructor)

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:16

## Properties

### initialized

• `Private` **initialized**: `boolean` = `false`

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:13

---

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[logger](GlobalExceptionFilter.md#logger)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:14

---

### options

• `Private` `Optional` `Readonly` **options**: `any`

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:14

---

### sentry

• `Private` **sentry**: `__module`

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:12

## Methods

### catch

▸ **catch**(`exception`, `host`): `void`

#### Parameters

| Name        | Type            |
| :---------- | :-------------- |
| `exception` | `Error`         |
| `host`      | `ArgumentsHost` |

#### Returns

`void`

#### Implementation of

ExceptionFilter.catch

#### Overrides

[GlobalExceptionFilter](GlobalExceptionFilter.md).[catch](GlobalExceptionFilter.md#catch)

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:73

---

### handleGraphQL

▸ `Protected` **handleGraphQL**(`payload`): `HttpException`

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `payload` | [`EnrichedExceptionError`](EnrichedExceptionError.md) |

#### Returns

`HttpException`

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[handleGraphQL](GlobalExceptionFilter.md#handlegraphql)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:109

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[handleHttp](GlobalExceptionFilter.md#handlehttp)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:96

---

### onApplicationShutdown

▸ **onApplicationShutdown**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnApplicationShutdown.onApplicationShutdown

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:69

---

### payload

▸ `Protected` **payload**(`exception?`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name         | Type    |
| :----------- | :------ |
| `exception?` | `Error` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[payload](GlobalExceptionFilter.md#payload)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:92

---

### shouldIgnore

▸ `Protected` **shouldIgnore**(`exception`): `boolean`

#### Parameters

| Name        | Type    |
| :---------- | :------ |
| `exception` | `Error` |

#### Returns

`boolean`

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[shouldIgnore](GlobalExceptionFilter.md#shouldignore)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:82

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[debug](GlobalExceptionFilter.md#debug)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:49

---

### defaultPayload

▸ `Static` **defaultPayload**(`exception`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `exception` | `any` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[defaultPayload](GlobalExceptionFilter.md#defaultpayload)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[formatMessage](GlobalExceptionFilter.md#formatmessage)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:39
