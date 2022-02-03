[@webundsoehne/nestjs-util](../README.md) / LoggerService

# Class: LoggerService

## Implements

- `LoggerService`

## Table of contents

### Constructors

- [constructor](LoggerService.md#constructor)

### Methods

- [debug](LoggerService.md#debug)
- [error](LoggerService.md#error)
- [getLogger](LoggerService.md#getlogger)
- [log](LoggerService.md#log)
- [logMessage](LoggerService.md#logmessage)
- [verbose](LoggerService.md#verbose)
- [warn](LoggerService.md#warn)

## Constructors

### constructor

• **new LoggerService**(`context?`)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `context?` | `string` |

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:12

## Methods

### debug

▸ **debug**(`message`, `context?`): `void`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message`  | `any`    |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.debug

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:39

---

### error

▸ **error**(`message`, `trace?`, `context?`): `void`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message`  | `any`    |
| `trace?`   | `string` |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.error

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:14

---

### getLogger

▸ `Private` **getLogger**(`level?`): `Logger`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `level?` | `string` |

#### Returns

`Logger`

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:56

---

### log

▸ **log**(`message`, `context?`): `void`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message`  | `any`    |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.log

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:23

---

### logMessage

▸ `Private` **logMessage**(`__namedParameters`): `void`

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | `Object` |
| `__namedParameters.context?` | `string` |
| `__namedParameters.message`  | `any`    |
| `__namedParameters.trace?`   | `any`    |
| `__namedParameters.type`     | `string` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:79

---

### verbose

▸ **verbose**(`message`, `context?`): `void`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message`  | `any`    |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.verbose

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:47

---

### warn

▸ **warn**(`message`, `context?`): `void`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message`  | `any`    |
| `context?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.warn

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:31
