[@webundsoehne/nestjs-util](../README.md) / BadRequestExceptionFilter

# Class: BadRequestExceptionFilter

## Hierarchy

- [`GlobalExceptionFilter`](GlobalExceptionFilter.md)

  ↳ **`BadRequestExceptionFilter`**

## Table of contents

### Constructors

- [constructor](BadRequestExceptionFilter.md#constructor)

### Properties

- [logger](BadRequestExceptionFilter.md#logger)

### Methods

- [catch](BadRequestExceptionFilter.md#catch)
- [handleGraphQL](BadRequestExceptionFilter.md#handlegraphql)
- [handleHttp](BadRequestExceptionFilter.md#handlehttp)
- [payload](BadRequestExceptionFilter.md#payload)
- [shouldIgnore](BadRequestExceptionFilter.md#shouldignore)
- [debug](BadRequestExceptionFilter.md#debug)
- [defaultPayload](BadRequestExceptionFilter.md#defaultpayload)
- [formatMessage](BadRequestExceptionFilter.md#formatmessage)
- [formatValidationErrors](BadRequestExceptionFilter.md#formatvalidationerrors)

## Constructors

### constructor

• **new BadRequestExceptionFilter**()

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[constructor](GlobalExceptionFilter.md#constructor)

## Properties

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[logger](GlobalExceptionFilter.md#logger)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[catch](GlobalExceptionFilter.md#catch)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:59

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

### payload

▸ `Protected` **payload**(`exception`): [`EnrichedException`](../interfaces/EnrichedException.md)

#### Parameters

| Name        | Type                  |
| :---------- | :-------------------- |
| `exception` | `BadRequestException` |

#### Returns

[`EnrichedException`](../interfaces/EnrichedException.md)

#### Overrides

[GlobalExceptionFilter](GlobalExceptionFilter.md).[payload](GlobalExceptionFilter.md#payload)

#### Defined in

packages/nestjs-util/src/filter/bad-request-exception.filter.ts:30

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

---

### formatValidationErrors

▸ `Static` **formatValidationErrors**(`errors`): [`ClassValidatorError`](../interfaces/ClassValidatorError.md)[]

#### Parameters

| Name     | Type                |
| :------- | :------------------ |
| `errors` | `ValidationError`[] |

#### Returns

[`ClassValidatorError`](../interfaces/ClassValidatorError.md)[]

#### Defined in

packages/nestjs-util/src/filter/bad-request-exception.filter.ts:12
