[@webundsoehne/nx-builders](../README.md) / RunBuilderOptions

# Interface: RunBuilderOptions

Options for run builder

## Hierarchy

- `JsonObject`

  ↳ **`RunBuilderOptions`**

## Table of contents

### Properties

- [args](RunBuilderOptions.md#args)
- [command](RunBuilderOptions.md#command)
- [cwd](RunBuilderOptions.md#cwd)
- [environment](RunBuilderOptions.md#environment)
- [interactive](RunBuilderOptions.md#interactive)
- [node](RunBuilderOptions.md#node)
- [nodeOptions](RunBuilderOptions.md#nodeoptions)
- [watch](RunBuilderOptions.md#watch)

## Properties

### args

• `Optional` **args**: `string` \| `string`[]

append arguments to the command

#### Defined in

builders/run/main.interface.ts:18

---

### command

• **command**: `string`

command

#### Defined in

builders/run/main.interface.ts:15

---

### cwd

• **cwd**: `string`

process current working directory

this will spawn the process from the current working directory so most of the plugins will work as expected

#### Defined in

builders/run/main.interface.ts:12

---

### environment

• `Optional` **environment**: `Record`<`string`, `string`\>

environment variables

#### Defined in

builders/run/main.interface.ts:33

---

### interactive

• **interactive**: `boolean`

run with interactive mode, will not parse through the logger

#### Defined in

builders/run/main.interface.ts:21

---

### node

• **node**: `boolean`

run with node

#### Defined in

builders/run/main.interface.ts:24

---

### nodeOptions

• `Optional` **nodeOptions**: `string`

pass in node options when running as node

#### Defined in

builders/run/main.interface.ts:27

---

### watch

• **watch**: `boolean`

keep alive the process if it crashes

#### Defined in

builders/run/main.interface.ts:30
