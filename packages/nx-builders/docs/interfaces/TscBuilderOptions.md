[@webundsoehne/nx-builders](../README.md) / TscBuilderOptions

# Interface: TscBuilderOptions

TSC Builder options

## Hierarchy

- **`TscBuilderOptions`**

  ↳ [`NormalizedBuilderOptions`](NormalizedBuilderOptions.md)

## Table of contents

### Properties

- [assets](TscBuilderOptions.md#assets)
- [cwd](TscBuilderOptions.md#cwd)
- [environment](TscBuilderOptions.md#environment)
- [main](TscBuilderOptions.md#main)
- [outputPath](TscBuilderOptions.md#outputpath)
- [packageJson](TscBuilderOptions.md#packagejson)
- [runAfterWatch](TscBuilderOptions.md#runafterwatch)
- [swapPaths](TscBuilderOptions.md#swappaths)
- [tsConfig](TscBuilderOptions.md#tsconfig)
- [watch](TscBuilderOptions.md#watch)

## Properties

### assets

• `Optional` **assets**: `AvailableAssetGlob`

copy assets

**`Param`**

when a string defined it has to be inside the application directory, if it is outside a glob should be defined

#### Defined in

builders/tsc/main.interface.ts:45

___

### cwd

• **cwd**: `string`

process current working directory

this will spawn the process from the current working directory so most of the plugins will work as expected

#### Defined in

builders/tsc/main.interface.ts:12

___

### environment

• `Optional` **environment**: `EnvironmentVariables`

inject environment variables to build process

#### Defined in

builders/tsc/main.interface.ts:56

___

### main

• **main**: `string`

entrypoint for the application which ts-node will run

#### Defined in

builders/tsc/main.interface.ts:15

___

### outputPath

• **outputPath**: `string`

dist folder for generated common.js files

#### Defined in

builders/tsc/main.interface.ts:24

___

### packageJson

• `Optional` **packageJson**: `string`

package.json name to process
defaults to package.json

#### Defined in

builders/tsc/main.interface.ts:51

___

### runAfterWatch

• `Optional` **runAfterWatch**: `string`

command to run after completion when in watch mode

#### Defined in

builders/tsc/main.interface.ts:39

___

### swapPaths

• `Optional` **swapPaths**: `boolean`

swap paths after the tsc finished
defaults to true

#### Defined in

builders/tsc/main.interface.ts:30

___

### tsConfig

• **tsConfig**: `string`

tsconfig file that is used
will default to tsconfig.build.json

#### Defined in

builders/tsc/main.interface.ts:21

___

### watch

• `Optional` **watch**: `boolean`

enable watch functionality with tsc-watch
runAfterWatch has to be defined

#### Defined in

builders/tsc/main.interface.ts:36
