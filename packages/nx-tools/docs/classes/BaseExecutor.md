[@webundsoehne/nx-tools](../README.md) / BaseExecutor

# Class: BaseExecutor<ExecutorOptions, NormalizedExecutorOptions, ProcessPaths\>

Base builder for extending from.

## Type parameters

| Name | Type |
| :------ | :------ |
| `ExecutorOptions` | extends `Record`<`PropertyKey`, `any`\> |
| `NormalizedExecutorOptions` | extends `Record`<`PropertyKey`, `any`\> |
| `ProcessPaths` | extends `Record`<`PropertyKey`, `string`\> = `Record`<`PropertyKey`, `string`\> |

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

| Name | Type |
| :------ | :------ |
| `ExecutorOptions` | extends `Record`<`PropertyKey`, `any`\> |
| `NormalizedExecutorOptions` | extends `Record`<`PropertyKey`, `any`\> |
| `ProcessPaths` | extends `Record`<`PropertyKey`, `string`\> = `Record`<`PropertyKey`, `string`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `builderOptions` | `ExecutorOptions` |
| `context` | `ExecutorContext` |

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:26

## Properties

### builderOptions

• **builderOptions**: `ExecutorOptions`

___

### context

• **context**: `ExecutorContext`

___

### logger

• **logger**: [`Logger`](Logger.md)

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:17

___

### manager

• **manager**: [`ProcessManager`](ProcessManager.md)

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:23

___

### options

• **options**: `NormalizedExecutorOptions`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:21

___

### paths

• **paths**: `ProcessPaths`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:22

___

### project

• **project**: `ProjectConfiguration`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:24

___

### projectDependencies

• **projectDependencies**: `DependentBuildableProjectNode`[]

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:20

___

### projectGraph

• **projectGraph**: `ProjectGraph`<`any`\>

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:18

___

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

___

### normalizeOptions

▸ `Abstract` **normalizeOptions**(`options`): `NormalizedExecutorOptions`

Normalize the incoming options

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ExecutorOptions` |

#### Returns

`NormalizedExecutorOptions`

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:66

___

### run

▸ `Abstract` **run**(): `Promise`<`BuilderOutput`\>

The run command about what to do

#### Returns

`Promise`<`BuilderOutput`\>

#### Defined in

packages/nx-tools/src/utils/builders/base-executor.ts:60
