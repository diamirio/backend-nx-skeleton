[@webundsoehne/nx-tools](../README.md) / ProcessManager

# Class: ProcessManager

Process manager is an instance where it tracks current child processes.abs

You can add long-living and short-living process to keep track of processes spawned by node.

## Table of contents

### Constructors

- [constructor](ProcessManager.md#constructor)

### Properties

- [logger](ProcessManager.md#logger)
- [persistentTasks](ProcessManager.md#persistenttasks)
- [tasks](ProcessManager.md#tasks)

### Methods

- [add](ProcessManager.md#add)
- [addPersistent](ProcessManager.md#addpersistent)
- [kill](ProcessManager.md#kill)
- [killProcesses](ProcessManager.md#killprocesses)
- [stop](ProcessManager.md#stop)

## Constructors

### constructor

• **new ProcessManager**(`context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `SchematicContext` \| `BuilderContext` \| `ExecutorContext` |

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:20

## Properties

### logger

• `Private` **logger**: [`Logger`](Logger.md)

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:16

___

### persistentTasks

• `Private` **persistentTasks**: `ExecaChildProcess`<`string`\>[] = `[]`

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:18

___

### tasks

• `Private` **tasks**: `ExecaChildProcess`<`string`\>[] = `[]`

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:17

## Methods

### add

▸ **add**(`instance`): `ExecaChildProcess`<`string`\>

Add a new task that is killable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `ExecaChildProcess`<`string`\> |

#### Returns

`ExecaChildProcess`<`string`\>

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:25

___

### addPersistent

▸ **addPersistent**(`instance`): `ExecaChildProcess`<`string`\>

Add a persistent task that should not be killed until everything finishes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `ExecaChildProcess`<`string`\> |

#### Returns

`ExecaChildProcess`<`string`\>

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:32

___

### kill

▸ **kill**(): `Promise`<`void` \| `void`[]\>

Kill all non-persistent tasks.

#### Returns

`Promise`<`void` \| `void`[]\>

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:39

___

### killProcesses

▸ `Private` **killProcesses**(`tasks`): `Promise`<`void` \| `void`[]\>

Tree kill proceseses.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `ExecaChildProcess`<`string`\>[] |

#### Returns

`Promise`<`void` \| `void`[]\>

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:52

___

### stop

▸ **stop**(): `Promise`<`void` \| `void`[]\>

Stop the processes compeletely.

#### Returns

`Promise`<`void` \| `void`[]\>

#### Defined in

packages/nx-tools/src/utils/node/process-manager.ts:45
