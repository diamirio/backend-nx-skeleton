[@webundsoehne/nx-tools](../README.md) / Logger

# Class: Logger

A general logger that is wrapped around the angular-cli logger.

It is not great but winston was not working that well in a amazingly stateless architecture.

## Table of contents

### Constructors

- [constructor](Logger.md#constructor)

### Properties

- [logLevel](Logger.md#loglevel)
- [logger](Logger.md#logger)
- [instance](Logger.md#instance)

### Methods

- [debug](Logger.md#debug)
- [error](Logger.md#error)
- [fatal](Logger.md#fatal)
- [info](Logger.md#info)
- [initiateLogger](Logger.md#initiatelogger)
- [logColoring](Logger.md#logcoloring)
- [parseMessage](Logger.md#parsemessage)
- [warn](Logger.md#warn)

## Constructors

### constructor

• **new Logger**(`context?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `BuilderContext` \| `SchematicContext` \| `ExecutorContext` |
| `options?` | [`LoggerOptions`](../interfaces/LoggerOptions.md) |

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:24

## Properties

### logLevel

• **logLevel**: [`LogLevels`](../enums/LogLevels.md)

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:21

___

### logger

• `Private` **logger**: [`Winston`](../README.md#winston)

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:22

___

### instance

▪ `Static` **instance**: [`Winston`](../README.md#winston)

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:20

## Methods

### debug

▸ **debug**(`data`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Buffer` |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:59

___

### error

▸ **error**(`data`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Buffer` |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:47

___

### fatal

▸ **fatal**(`data`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Buffer` |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:43

___

### info

▸ **info**(`data`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Buffer` |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:55

___

### initiateLogger

▸ `Private` **initiateLogger**(): [`Winston`](../README.md#winston)

#### Returns

[`Winston`](../README.md#winston)

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:63

___

### logColoring

▸ `Private` **logColoring**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.context?` | `string` |
| `__namedParameters.level` | [`LogLevels`](../enums/LogLevels.md) |
| `__namedParameters.message` | `string` |

#### Returns

`string`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:109

___

### parseMessage

▸ `Private` **parseMessage**(`level`, `data`, `args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | [`LogLevels`](../enums/LogLevels.md) |
| `data` | `string` \| `Buffer` |
| `args` | `any`[] |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:105

___

### warn

▸ **warn**(`data`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Buffer` |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:51
