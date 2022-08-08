[@webundsoehne/nestjs-util](../README.md) / LoggerService

# Class: LoggerService

## Implements

- `LoggerService`

## Table of contents

### Constructors

- [constructor](LoggerService.md#constructor)

### Properties

- [transports](LoggerService.md#transports)
- [instance](LoggerService.md#instance)

### Methods

- [addTransport](LoggerService.md#addtransport)
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

| Name | Type |
| :------ | :------ |
| `context?` | `string` |

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:30

## Properties

### transports

• `Private` **transports**: `TransportStream`[]

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:11

___

### instance

▪ `Static` **instance**: `Logger`

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:9

## Methods

### addTransport

▸ **addTransport**(`transport`): [`LoggerService`](LoggerService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transport` | `TransportStream` |

#### Returns

[`LoggerService`](LoggerService.md)

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:32

___

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

packages/nestjs-util/src/provider/logger/logger.service.ts:65

___

### error

▸ **error**(`message`, `context?`, `trace?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context?` | `string` |
| `trace?` | `string` |

#### Returns

`void`

#### Implementation of

LoggerServiceCommon.error

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:40

___

### getLogger

▸ `Private` **getLogger**(`logLevel?`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logLevel?` | `string` |

#### Returns

`Logger`

#### Defined in

packages/nestjs-util/src/provider/logger/logger.service.ts:81

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

packages/nestjs-util/src/provider/logger/logger.service.ts:49

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

packages/nestjs-util/src/provider/logger/logger.service.ts:100

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

packages/nestjs-util/src/provider/logger/logger.service.ts:73

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

packages/nestjs-util/src/provider/logger/logger.service.ts:57
