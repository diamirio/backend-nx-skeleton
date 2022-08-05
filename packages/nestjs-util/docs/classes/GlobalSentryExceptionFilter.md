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
- [onApplicationShutdown](GlobalSentryExceptionFilter.md#onapplicationshutdown)
- [payload](GlobalSentryExceptionFilter.md#payload)
- [defaultPayload](GlobalSentryExceptionFilter.md#defaultpayload)

## Constructors

### constructor

• **new GlobalSentryExceptionFilter**()

#### Overrides

[GlobalExceptionFilter](GlobalExceptionFilter.md).[constructor](GlobalExceptionFilter.md#constructor)

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:15

## Properties

### initialized

• `Private` **initialized**: `boolean` = `false`

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:12

---

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[logger](GlobalExceptionFilter.md#logger)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:11

---

### options

• `Private` `Optional` `Readonly` **options**: `any`

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:13

---

### sentry

• `Private` **sentry**: `any`

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:11

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

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:68

---

### onApplicationShutdown

▸ **onApplicationShutdown**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnApplicationShutdown.onApplicationShutdown

#### Defined in

packages/nestjs-util/src/filter/global-sentry-exception.filter.ts:92

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

packages/nestjs-util/src/filter/global-exception.filter.ts:47

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

packages/nestjs-util/src/filter/global-exception.filter.ts:13
