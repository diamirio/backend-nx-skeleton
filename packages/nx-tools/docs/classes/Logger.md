[@webundsoehne/nx-tools](../README.md) / Logger

# Class: Logger

A general logger that is wrapped around the angular-cli logger.

It is not great but winston was not working that well in a amazingly stateless architecture.

## Table of contents

### Constructors

- [constructor](Logger.md#constructor)

### Methods

- [debug](Logger.md#debug)
- [error](Logger.md#error)
- [fatal](Logger.md#fatal)
- [info](Logger.md#info)
- [logColoring](Logger.md#logcoloring)
- [parseMessage](Logger.md#parsemessage)
- [warn](Logger.md#warn)

## Constructors

### constructor

• **new Logger**(`context`, `options?`)

#### Parameters

| Name       | Type                                              |
| :--------- | :------------------------------------------------ |
| `context`  | `BuilderContext` \| `SchematicContext`            |
| `options?` | [`LoggerOptions`](../interfaces/LoggerOptions.md) |

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:15

## Methods

### debug

▸ **debug**(`data`, ...`args`): `void`

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `data`    | `string` \| `Buffer` |
| `...args` | `any`                |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:36

---

### error

▸ **error**(`data`, ...`args`): `void`

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `data`    | `string` \| `Buffer` |
| `...args` | `any`                |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:24

---

### fatal

▸ **fatal**(`data`, ...`args`): `void`

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `data`    | `string` \| `Buffer` |
| `...args` | `any`                |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:20

---

### info

▸ **info**(`data`, ...`args`): `void`

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `data`    | `string` \| `Buffer` |
| `...args` | `any`                |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:32

---

### logColoring

▸ `Private` **logColoring**(`__namedParameters`): `string`

#### Parameters

| Name                         | Type                                                        |
| :--------------------------- | :---------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                    |
| `__namedParameters.context?` | `string`                                                    |
| `__namedParameters.level`    | `"debug"` \| `"info"` \| `"warn"` \| `"error"` \| `"fatal"` |
| `__namedParameters.message`  | `string`                                                    |

#### Returns

`string`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:59

---

### parseMessage

▸ `Private` **parseMessage**(`level`, `data`, `args`): `void`

#### Parameters

| Name    | Type                                                        |
| :------ | :---------------------------------------------------------- |
| `level` | `"debug"` \| `"info"` \| `"warn"` \| `"error"` \| `"fatal"` |
| `data`  | `string` \| `Buffer`                                        |
| `args`  | `any`[]                                                     |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:40

---

### warn

▸ **warn**(`data`, ...`args`): `void`

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `data`    | `string` \| `Buffer` |
| `...args` | `any`                |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/logger.ts:28
