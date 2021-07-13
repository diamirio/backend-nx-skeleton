[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / LoggerService

# Class: LoggerService

[index](../modules/index.md).LoggerService

## Implements

- `LoggerServiceCommon`

## Table of contents

### Constructors

- [constructor](index.LoggerService.md#constructor)

### Methods

- [debug](index.LoggerService.md#debug)
- [error](index.LoggerService.md#error)
- [getLogger](index.LoggerService.md#getlogger)
- [log](index.LoggerService.md#log)
- [logMessage](index.LoggerService.md#logmessage)
- [verbose](index.LoggerService.md#verbose)
- [warn](index.LoggerService.md#warn)

## Constructors

### constructor

• **new LoggerService**(`context?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `string` |

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:12

## Methods

### debug

▸ **debug**(`message`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.debug

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:63

___

### error

▸ **error**(`message`, `trace?`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `trace?` | `string` |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.error

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:38

___

### getLogger

▸ `Private` **getLogger**(`level?`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level?` | `string` |

#### Returns

`Logger`

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:15

___

### log

▸ **log**(`message`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.log

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:47

___

### logMessage

▸ `Private` **logMessage**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.context?` | `string` |
| `__namedParameters.message` | `any` |
| `__namedParameters.trace?` | `any` |
| `__namedParameters.type` | `string` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:79

___

### verbose

▸ **verbose**(`message`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.verbose

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:71

___

### warn

▸ **warn**(`message`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.warn

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:55
