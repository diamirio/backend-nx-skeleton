[@webundsoehne/nx-tools](../README.md) / BaseExecutor

# Class: BaseExecutor<ExecutorOptions, NormalizedExecutorOptions, ProcessPaths\>

Base builder for extending from.

## Type parameters

| Name                        | Type                                                                            |
| :-------------------------- | :------------------------------------------------------------------------------ |
| `ExecutorOptions`           | extends `Record`<`PropertyKey`, `any`\>                                         |
| `NormalizedExecutorOptions` | extends `Record`<`PropertyKey`, `any`\>                                         |
| `ProcessPaths`              | extends `Record`<`PropertyKey`, `string`\> = `Record`<`PropertyKey`, `string`\> |

## Table of contents

### Constructors

- [constructor](BaseExecutor.md#constructor)

### Properties

- [builderOptions](BaseExecutor.md#builderoptions)
- [context](BaseExecutor.md#context)
- [logger](BaseExecutor.md#logger)
- [manager](BaseExecutor.md#manager)
- [options](BaseExecutor.md#options)
- [paths](BaseExecutor.md#paths)
- [project](BaseExecutor.md#project)
- [projectDependencies](BaseExecutor.md#projectdependencies)
- [projectGraph](BaseExecutor.md#projectgraph)
- [projectTarget](BaseExecutor.md#projecttarget)

### Methods

- [init](BaseExecutor.md#init)
- [normalizeOptions](BaseExecutor.md#normalizeoptions)
- [run](BaseExecutor.md#run)

## Constructors

### constructor

• **new BaseExecutor**<`ExecutorOptions`, `NormalizedExecutorOptions`, `ProcessPaths`\>(`builderOptions`, `context`)

#### Type parameters

| Name                        | Type                                                                            |
| :-------------------------- | :------------------------------------------------------------------------------ |
| `ExecutorOptions`           | extends `Record`<`PropertyKey`, `any`\>                                         |
| `NormalizedExecutorOptions` | extends `Record`<`PropertyKey`, `any`\>                                         |
| `ProcessPaths`              | extends `Record`<`PropertyKey`, `string`\> = `Record`<`PropertyKey`, `string`\> |

#### Parameters

| Name             | Type              |
| :--------------- | :---------------- |
| `builderOptions` | `ExecutorOptions` |
| `context`        | `ExecutorContext` |

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:26

## Properties

### builderOptions

• **builderOptions**: `ExecutorOptions`

---

### context

• **context**: `ExecutorContext`

---

### logger

• **logger**: [`Logger`](Logger.md)

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:17

---

### manager

• **manager**: [`ProcessManager`](ProcessManager.md)

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:23

---

### options

• **options**: `NormalizedExecutorOptions`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:21

---

### paths

• **paths**: `ProcessPaths`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:22

---

### project

• **project**: `ProjectConfiguration`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:24

---

### projectDependencies

• **projectDependencies**: `DependentBuildableProjectNode`[]

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:20

---

### projectGraph

• **projectGraph**: `ProjectGraph`<`any`\>

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:18

---

### projectTarget

• **projectTarget**: `ProjectGraphNode`<`Record`<`string`, `unknown`\>\>

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:19

## Methods

### init

▸ **init**(): `void`

Initiate the builder first.

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:53

---

### normalizeOptions

▸ `Abstract` **normalizeOptions**(`options`): `NormalizedExecutorOptions`

Normalize the incoming options

#### Parameters

| Name      | Type              |
| :-------- | :---------------- |
| `options` | `ExecutorOptions` |

#### Returns

`NormalizedExecutorOptions`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:66

---

### run

▸ `Abstract` **run**(): `Promise`<`BuilderOutput`\>

The run command about what to do

#### Returns

`Promise`<`BuilderOutput`\>

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:60
