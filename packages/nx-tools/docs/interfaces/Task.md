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
- [token](Task.md#token)

### Methods

- [fn](Task.md#fn)

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

### token

• **token**: `ValueOf`<`T`\>

#### Defined in

packages/nx-tools/src/tasks/manage-multiple-tasks.interface.ts:7

## Methods

### fn

▸ **fn**(`host`, `context`, `dependencies`): `TaskId`

#### Parameters

| Name | Type |
| :------ | :------ |
| `host` | `Tree` |
| `context` | `SchematicContext` |
| `dependencies` | `TaskId`[] |

#### Returns

`TaskId`

#### Defined in

packages/nx-tools/src/tasks/manage-multiple-tasks.interface.ts:8
