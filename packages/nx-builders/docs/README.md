@webundsoehne/nx-builders

# @webundsoehne/nx-builders

## Table of contents

### Enumerations

- [AvailableBuilders](enums/AvailableBuilders.md)

### Interfaces

- [ExecuteBuilderOptions](interfaces/ExecuteBuilderOptions.md)
- [NormalizedBuilderOptions](interfaces/NormalizedBuilderOptions.md)
- [RunBuilderOptions](interfaces/RunBuilderOptions.md)
- [TsNodeBuilderOptions](interfaces/TsNodeBuilderOptions.md)
- [TscBuilderOptions](interfaces/TscBuilderOptions.md)

### Type aliases

- [NormalizedExecuteBuilderOptions](README.md#normalizedexecutebuilderoptions)
- [NormalizedRunBuilderOptions](README.md#normalizedrunbuilderoptions)
- [OptionParser](README.md#optionparser)
- [OptionParserModes](README.md#optionparsermodes)
- [ProcessPaths](README.md#processpaths)

### Functions

- [initiateBuilderDependencies](README.md#initiatebuilderdependencies)

## Type aliases

### NormalizedExecuteBuilderOptions

Ƭ **NormalizedExecuteBuilderOptions**: [`ExecuteBuilderOptions`](interfaces/ExecuteBuilderOptions.md)

#### Defined in

builders/execute/main.interface.ts:41

___

### NormalizedRunBuilderOptions

Ƭ **NormalizedRunBuilderOptions**: `ExecaArguments`

#### Defined in

builders/run/main.interface.ts:39

___

### OptionParser

Ƭ **OptionParser**<`T`\>: { `mode?`: [`OptionParserModes`](README.md#optionparsermodes)[] ; `rules?`: { `args`: `T` ; `condition?`: `boolean`  }[]  }[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

builders/tsc/main.interface.ts:67

___

### OptionParserModes

Ƭ **OptionParserModes**: ``"typescript"`` \| ``"tsconfigReplacePaths"`` \| ``"tsc-watch"`` \| ``"runAfterWatch"``

#### Defined in

builders/tsc/main.interface.ts:65

___

### ProcessPaths

Ƭ **ProcessPaths**: `Record`<``"typescript"`` \| ``"tsconfigReplacePaths"`` \| ``"tscWatch"`` \| ``"tsconfig"``, `string`\>

#### Defined in

builders/tsc/main.interface.ts:69

## Functions

### initiateBuilderDependencies

▸ **initiateBuilderDependencies**(`options`): `Rule`

A function to initiate builder depdencies. It may be wiser to call it via schematic.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AvailableBuilders`](enums/AvailableBuilders.md)[] |

#### Returns

`Rule`

#### Defined in

utils/initiate-builder.ts:13
