[@webundsoehne/nestjs-util](../README.md) / BadRequestExceptionFilter

# Class: BadRequestExceptionFilter

## Hierarchy

- [`GlobalExceptionFilter`](GlobalExceptionFilter.md)

  ↳ **`BadRequestExceptionFilter`**

## Table of contents

### Constructors

- [constructor](BadRequestExceptionFilter.md#constructor)

### Methods

- [catch](BadRequestExceptionFilter.md#catch)
- [payload](BadRequestExceptionFilter.md#payload)
- [defaultPayload](BadRequestExceptionFilter.md#defaultpayload)

## Constructors

### constructor

• **new BadRequestExceptionFilter**()

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[constructor](GlobalExceptionFilter.md#constructor)

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

#### Inherited from

[GlobalExceptionFilter](GlobalExceptionFilter.md).[catch](GlobalExceptionFilter.md#catch)

#### Defined in

packages/nestjs-util/src/filter/global-exception.filter.ts:22

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

packages/nestjs-util/src/filter/bad-request-exception.filter.ts:9

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
