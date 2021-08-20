[@webundsoehne/nx-tools](../README.md) / PipeProcessToLoggerOptions

# Interface: PipeProcessToLoggerOptions

## Table of contents

### Properties

- [exitCode](PipeProcessToLoggerOptions.md#exitcode)
- [start](PipeProcessToLoggerOptions.md#start)
- [stderr](PipeProcessToLoggerOptions.md#stderr)
- [stdout](PipeProcessToLoggerOptions.md#stdout)

### Methods

- [callback](PipeProcessToLoggerOptions.md#callback)

## Properties

### exitCode

• `Optional` **exitCode**: `boolean`

Will log the exit code when process finishes.

#### Defined in

packages/nx-tools/src/utils/logger/pipe-process-to-logger.interface.ts:5

---

### start

• `Optional` **start**: `boolean`

Will log the command when the process starts.

#### Defined in

packages/nx-tools/src/utils/logger/pipe-process-to-logger.interface.ts:3

---

### stderr

• `Optional` **stderr**: `boolean`

enable/disable stderrr

#### Defined in

packages/nx-tools/src/utils/logger/pipe-process-to-logger.interface.ts:9

---

### stdout

• `Optional` **stdout**: `boolean`

enable/disable stdout

#### Defined in

packages/nx-tools/src/utils/logger/pipe-process-to-logger.interface.ts:7

## Methods

### callback

▸ `Optional` **callback**(`error?`): `void`

will callback on error in the instance

#### Parameters

| Name     | Type    |
| :------- | :------ |
| `error?` | `Error` |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/logger/pipe-process-to-logger.interface.ts:11
