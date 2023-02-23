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
- [handleRpc](BadRequestExceptionFilter.md#handlerpc)
- [payload](BadRequestExceptionFilter.md#payload)
- [shouldIgnore](BadRequestExceptionFilter.md#shouldignore)
- [debug](BadRequestExceptionFilter.md#debug)
- [defaultPayload](BadRequestExceptionFilter.md#defaultpayload)
- [format](BadRequestExceptionFilter.md#format)
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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[catch](GlobalExceptionFilter.md#catch)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[handleGraphQL](GlobalExceptionFilter.md#handlegraphql)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[handleHttp](GlobalExceptionFilter.md#handlehttp)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[handleRpc](GlobalExceptionFilter.md#handlerpc)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:128

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[debug](GlobalExceptionFilter.md#debug)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[defaultPayload](GlobalExceptionFilter.md#defaultpayload)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[format](GlobalExceptionFilter.md#format)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:41

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
