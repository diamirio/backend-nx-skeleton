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

---

### OptionParser

Ƭ **OptionParser**<`T`\>: { `mode?`: [`OptionParserModes`](README.md#optionparsermodes)[] ; `rules?`: { `args`: `T` ; `condition?`: `boolean` }[] }[]

#### Type parameters

| Name | Type          |
| :--- | :------------ |
| `T`  | extends `any` |

#### Defined in

builders/tsc/main.interface.ts:70

---

### OptionParserModes

Ƭ **OptionParserModes**: `"typescript"` \| `"tscpaths"` \| `"tsc-watch"` \| `"runAfterWatch"`

#### Defined in

builders/tsc/main.interface.ts:68

---

### ProcessPaths

Ƭ **ProcessPaths**: `Partial`<`Record`<`"typescript"` \| `"tscpaths"` \| `"tscWatch"` \| `"tsconfig"` \| `"tsconfigPaths"`, `string`\>\>

#### Defined in

builders/tsc/main.interface.ts:72

## Functions

### initiateBuilderDependencies

▸ **initiateBuilderDependencies**(`options`): `Rule`

A function to initiate builder depdencies. It may be wiser to call it via schematic.

#### Parameters

| Name      | Type                  |
| :-------- | :-------------------- |
| `options` | `Schema`[``"items"``] |

#### Returns

`Rule`

#### Defined in

utils/initiate-builder.ts:11
