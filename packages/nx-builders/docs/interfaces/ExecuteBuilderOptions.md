[@webundsoehne/nx-builders](../README.md) / ExecuteBuilderOptions

# Interface: ExecuteBuilderOptions

Options for execute

## Table of contents

### Properties

- [buildTarget](ExecuteBuilderOptions.md#buildtarget)
- [cwd](ExecuteBuilderOptions.md#cwd)
- [environment](ExecuteBuilderOptions.md#environment)
- [inject](ExecuteBuilderOptions.md#inject)
- [keepAlive](ExecuteBuilderOptions.md#keepalive)
- [runAfter](ExecuteBuilderOptions.md#runafter)
- [waitUntilTargets](ExecuteBuilderOptions.md#waituntiltargets)
- [watch](ExecuteBuilderOptions.md#watch)

## Properties

### buildTarget

• **buildTarget**: `string`

The target to build before starting the process

#### Defined in

builders/execute/main.interface.ts:14

___

### cwd

• `Optional` **cwd**: `string`

Run the command in a working directory

#### Defined in

builders/execute/main.interface.ts:10

___

### environment

• `Optional` **environment**: `EnvironmentVariables`

Inject env variables to the run after build

#### Defined in

builders/execute/main.interface.ts:38

___

### inject

• `Optional` **inject**: `Record`<`string`, `any`\>

inject schematic options to the target

#### Defined in

builders/execute/main.interface.ts:30

___

### keepAlive

• `Optional` **keepAlive**: `boolean`

keep alive the process

#### Defined in

builders/execute/main.interface.ts:34

___

### runAfter

• `Optional` **runAfter**: `string`

Run after the tasks has been finished building

#### Defined in

builders/execute/main.interface.ts:18

___

### waitUntilTargets

• `Optional` **waitUntilTargets**: `string`[]

Wait until targets to finish before executing

#### Defined in

builders/execute/main.interface.ts:22

___

### watch

• `Optional` **watch**: `boolean`

Watch parameter for passing in to the target

#### Defined in

builders/execute/main.interface.ts:26
