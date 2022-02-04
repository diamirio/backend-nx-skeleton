[@webundsoehne/nx-builders](../README.md) / NormalizedBuilderOptions

# Interface: NormalizedBuilderOptions

## Hierarchy

- [`TscBuilderOptions`](TscBuilderOptions.md)

  ↳ **`NormalizedBuilderOptions`**

## Table of contents

### Properties

- [assets](NormalizedBuilderOptions.md#assets)
- [cwd](NormalizedBuilderOptions.md#cwd)
- [environment](NormalizedBuilderOptions.md#environment)
- [files](NormalizedBuilderOptions.md#files)
- [main](NormalizedBuilderOptions.md#main)
- [normalizedOutputPath](NormalizedBuilderOptions.md#normalizedoutputpath)
- [outputPath](NormalizedBuilderOptions.md#outputpath)
- [packageJson](NormalizedBuilderOptions.md#packagejson)
- [relativeMainFileOutput](NormalizedBuilderOptions.md#relativemainfileoutput)
- [runAfterWatch](NormalizedBuilderOptions.md#runafterwatch)
- [swapPaths](NormalizedBuilderOptions.md#swappaths)
- [tsConfig](NormalizedBuilderOptions.md#tsconfig)
- [watch](NormalizedBuilderOptions.md#watch)

## Properties

### assets

• `Optional` **assets**: `AvailableAssetGlob`

copy assets

**`param`** when a string defined it has to be inside the application directory, if it is outside a glob should be defined

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[assets](TscBuilderOptions.md#assets)

#### Defined in

builders/tsc/main.interface.ts:45

---

### cwd

• **cwd**: `string`

process current working directory

this will spawn the process from the current working directory so most of the plugins will work as expected

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[cwd](TscBuilderOptions.md#cwd)

#### Defined in

builders/tsc/main.interface.ts:12

---

### environment

• `Optional` **environment**: `Record`<`string`, `string`\>

inject environment variables to build process

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[environment](TscBuilderOptions.md#environment)

#### Defined in

builders/tsc/main.interface.ts:56

---

### files

• **files**: `FileInputOutput`[]

#### Defined in

builders/tsc/main.interface.ts:60

---

### main

• **main**: `string`

entrypoint for the application which ts-node will run

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[main](TscBuilderOptions.md#main)

#### Defined in

builders/tsc/main.interface.ts:15

---

### normalizedOutputPath

• **normalizedOutputPath**: `string`

#### Defined in

builders/tsc/main.interface.ts:61

---

### outputPath

• **outputPath**: `string`

dist folder for generated common.js files

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[outputPath](TscBuilderOptions.md#outputpath)

#### Defined in

builders/tsc/main.interface.ts:24

---

### packageJson

• `Optional` **packageJson**: `string`

package.json name to process defaults to package.json

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[packageJson](TscBuilderOptions.md#packagejson)

#### Defined in

builders/tsc/main.interface.ts:51

---

### relativeMainFileOutput

• **relativeMainFileOutput**: `string`

#### Defined in

builders/tsc/main.interface.ts:62

---

### runAfterWatch

• `Optional` **runAfterWatch**: `string`

command to run after completion when in watch mode

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[runAfterWatch](TscBuilderOptions.md#runafterwatch)

#### Defined in

builders/tsc/main.interface.ts:39

---

### swapPaths

• `Optional` **swapPaths**: `boolean`

swap paths after the tsc finished defaults to true

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[swapPaths](TscBuilderOptions.md#swappaths)

#### Defined in

builders/tsc/main.interface.ts:30

---

### tsConfig

• **tsConfig**: `string`

tsconfig file that is used will default to tsconfig.build.json

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[tsConfig](TscBuilderOptions.md#tsconfig)

#### Defined in

builders/tsc/main.interface.ts:21

---

### watch

• `Optional` **watch**: `boolean`

enable watch functionality with tsc-watch runAfterWatch has to be defined

#### Inherited from

[TscBuilderOptions](TscBuilderOptions.md).[watch](TscBuilderOptions.md#watch)

#### Defined in

builders/tsc/main.interface.ts:36
