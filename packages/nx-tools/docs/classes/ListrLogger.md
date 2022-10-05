[@webundsoehne/nx-tools](../README.md) / ListrLogger

# Class: ListrLogger

## Hierarchy

- `Logger`

  ↳ **`ListrLogger`**

## Table of contents

### Constructors

- [constructor](ListrLogger.md#constructor)

### Properties

- [logger](ListrLogger.md#logger)

### Methods

- [data](ListrLogger.md#data)
- [fail](ListrLogger.md#fail)
- [logColoring](ListrLogger.md#logcoloring)
- [parseMessage](ListrLogger.md#parsemessage)
- [retry](ListrLogger.md#retry)
- [rollback](ListrLogger.md#rollback)
- [skip](ListrLogger.md#skip)
- [start](ListrLogger.md#start)
- [success](ListrLogger.md#success)
- [title](ListrLogger.md#title)

## Constructors

### constructor

• **new ListrLogger**(`context?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `SchematicContext` \| `BuilderContext` \| `ExecutorContext` |
| `options?` | [`LoggerOptions`](../interfaces/LoggerOptions.md) |

#### Overrides

BaseLogger.constructor

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:12

## Properties

### logger

• **logger**: [`Logger`](Logger.md)

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:10

## Methods

### data

▸ **data**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.data

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:30

___

### fail

▸ **fail**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.fail

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:18

___

### logColoring

▸ `Protected` **logColoring**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.level` | `LogLevels` |
| `__namedParameters.message` | `string` |

#### Returns

`string`

#### Inherited from

BaseLogger.logColoring

#### Defined in

node_modules/listr2/dist/index.d.ts:715

___

### parseMessage

▸ `Protected` **parseMessage**(`level`, `message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `LogLevels` |
| `message` | `string` |

#### Returns

`string`

#### Inherited from

BaseLogger.parseMessage

#### Defined in

node_modules/listr2/dist/index.d.ts:714

___

### retry

▸ **retry**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.retry

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:42

___

### rollback

▸ **rollback**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.rollback

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:46

___

### skip

▸ **skip**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.skip

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:22

___

### start

▸ **start**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.start

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:34

___

### success

▸ **success**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.success

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:26

___

### title

▸ **title**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Overrides

BaseLogger.title

#### Defined in

packages/nx-tools/src/utils/logger/listr-logger.ts:38
