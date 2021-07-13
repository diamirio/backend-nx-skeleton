[@webundsoehne/nx-builders](../README.md) / TsNodeBuilderOptions

# Interface: TsNodeBuilderOptions

Options for ts-node-dev

## Hierarchy

- `JsonObject`

  ↳ **`TsNodeBuilderOptions`**

## Table of contents

### Properties

- [cwd](TsNodeBuilderOptions.md#cwd)
- [debounce](TsNodeBuilderOptions.md#debounce)
- [debug](TsNodeBuilderOptions.md#debug)
- [environment](TsNodeBuilderOptions.md#environment)
- [inspect](TsNodeBuilderOptions.md#inspect)
- [interval](TsNodeBuilderOptions.md#interval)
- [main](TsNodeBuilderOptions.md#main)
- [tsConfig](TsNodeBuilderOptions.md#tsconfig)

## Properties

### cwd

• **cwd**: `string`

process current working directory

this will spawn the process from the current working directory so most of the plugins will work as expected

#### Defined in

builders/ts-node-dev/main.interface.ts:12

---

### debounce

• `Optional` **debounce**: `number`

ts-node-dev debounce in ms

#### Defined in

builders/ts-node-dev/main.interface.ts:24

---

### debug

• `Optional` **debug**: `boolean`

node debug port enable

#### Defined in

builders/ts-node-dev/main.interface.ts:30

---

### environment

• `Optional` **environment**: `Record`<`string`, `string`\>

environment variables

#### Defined in

builders/ts-node-dev/main.interface.ts:36

---

### inspect

• `Optional` **inspect**: `number`

inspect port that should be opened when debugging

#### Defined in

builders/ts-node-dev/main.interface.ts:33

---

### interval

• `Optional` **interval**: `number`

ts-node-dev interval in ms

#### Defined in

builders/ts-node-dev/main.interface.ts:27

---

### main

• **main**: `string`

entrypoint for the application which ts-node will run

#### Defined in

builders/ts-node-dev/main.interface.ts:15

---

### tsConfig

• `Optional` **tsConfig**: `string`

tsconfig file that is used will default to tsconfig.json

#### Defined in

builders/ts-node-dev/main.interface.ts:21
