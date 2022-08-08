[@webundsoehne/nx-tools](../README.md) / Task

# Interface: Task<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `string`\> |

## Table of contents

### Properties

- [condition](Task.md#condition)
- [dependsOn](Task.md#dependson)
- [fn](Task.md#fn)
- [token](Task.md#token)

## Properties

### condition

• `Optional` **condition**: `boolean`

#### Defined in

packages/nx-tools/src/tasks/manage-multiple-tasks.interface.ts:6

___

### dependsOn

• `Optional` **dependsOn**: `ValueOf`<`T`\>[]

#### Defined in

packages/nx-tools/src/tasks/manage-multiple-tasks.interface.ts:9

___

### fn

• **fn**: (`host`: `Tree`, `context`: `SchematicContext`, `dependencies`: `TaskId`[]) => `TaskId`

#### Type declaration

▸ (`host`, `context`, `dependencies`): `TaskId`

##### Parameters

| Name | Type |
| :------ | :------ |
| `host` | `Tree` |
| `context` | `SchematicContext` |
| `dependencies` | `TaskId`[] |

##### Returns

`TaskId`

#### Defined in

packages/nx-tools/src/tasks/manage-multiple-tasks.interface.ts:8

___

### token

• **token**: `ValueOf`<`T`\>

#### Defined in

packages/nx-tools/src/tasks/manage-multiple-tasks.interface.ts:7
