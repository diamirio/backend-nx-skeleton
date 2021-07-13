[@webundsoehne/nx-tools](../README.md) / BaseBuilder

# Class: BaseBuilder<BuilderOptions, NormalizedBuilderOptions, ProcessPaths\>

Base builder for extending from.

## Type parameters

| Name                       | Type                                                                         |
| :------------------------- | :--------------------------------------------------------------------------- |
| `BuilderOptions`           | extends `Record`<`PropertyKey`, `any`\>                                      |
| `NormalizedBuilderOptions` | extends `Record`<`PropertyKey`, `any`\>                                      |
| `ProcessPaths`             | extends `Record`<`PropertyKey`, `string`\>`Record`<`PropertyKey`, `string`\> |

## Table of contents

### Constructors

- [constructor](BaseBuilder.md#constructor)

### Properties

- [builderOptions](BaseBuilder.md#builderoptions)
- [context](BaseBuilder.md#context)
- [logger](BaseBuilder.md#logger)
- [manager](BaseBuilder.md#manager)
- [options](BaseBuilder.md#options)
- [paths](BaseBuilder.md#paths)
- [projectDependencies](BaseBuilder.md#projectdependencies)
- [projectGraph](BaseBuilder.md#projectgraph)
- [projectTarget](BaseBuilder.md#projecttarget)

### Methods

- [init](BaseBuilder.md#init)
- [normalizeOptions](BaseBuilder.md#normalizeoptions)
- [run](BaseBuilder.md#run)

## Constructors

### constructor

• **new BaseBuilder**<`BuilderOptions`, `NormalizedBuilderOptions`, `ProcessPaths`\>(`builderOptions`, `context`)

#### Type parameters

| Name                       | Type                                                                         |
| :------------------------- | :--------------------------------------------------------------------------- |
| `BuilderOptions`           | extends `Record`<`PropertyKey`, `any`\>                                      |
| `NormalizedBuilderOptions` | extends `Record`<`PropertyKey`, `any`\>                                      |
| `ProcessPaths`             | extends `Record`<`PropertyKey`, `string`\>`Record`<`PropertyKey`, `string`\> |

#### Parameters

| Name             | Type             |
| :--------------- | :--------------- |
| `builderOptions` | `BuilderOptions` |
| `context`        | `BuilderContext` |

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:24

## Properties

### builderOptions

• **builderOptions**: `BuilderOptions`

---

### context

• **context**: `BuilderContext`

---

### logger

• **logger**: [`Logger`](Logger.md)

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:16

---

### manager

• **manager**: [`ProcessManager`](ProcessManager.md)

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:22

---

### options

• **options**: `NormalizedBuilderOptions`

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:20

---

### paths

• **paths**: `ProcessPaths`

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:21

---

### projectDependencies

• **projectDependencies**: `DependentBuildableProjectNode`[]

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:19

---

### projectGraph

• **projectGraph**: `ProjectGraph`<`any`\>

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:17

---

### projectTarget

• **projectTarget**: `ProjectGraphNode`<`Record`<`string`, `unknown`\>\>

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:18

## Methods

### init

▸ **init**(): `void`

Initiate the builder first.

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:48

---

### normalizeOptions

▸ `Abstract` **normalizeOptions**(`options`): `NormalizedBuilderOptions`

Normalize the incoming options

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `options` | `BuilderOptions` |

#### Returns

`NormalizedBuilderOptions`

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:61

---

### run

▸ `Abstract` **run**(): `Observable`<`BuilderOutput`\>

The run command about what to do

#### Returns

`Observable`<`BuilderOutput`\>

#### Defined in

packages/nx-tools/src/utils/builders/base-builder.ts:55
