[@webundsoehne/nx-tools](../README.md) / WorkspaceJSON

# Interface: WorkspaceJSON<T\>

workspace.json is where all of the nx data is stored.

## Type parameters

| Name | Type                                       |
| :--- | :----------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> = `any` |

## Table of contents

### Properties

- [defaultProject](WorkspaceJSON.md#defaultproject)
- [projects](WorkspaceJSON.md#projects)

## Properties

### defaultProject

• **defaultProject**: `string`

#### Defined in

packages/nx-tools/src/interfaces/add-project.interface.ts:17

---

### projects

• **projects**: `Record`<`string`, { `architect`: `T` ; `projectType`: [`NxProjectTypes`](../enums/NxProjectTypes.md) ; `root`: `string` ; `schematics`: `any` ; `sourceRoot`: `string` }\>

#### Defined in

packages/nx-tools/src/interfaces/add-project.interface.ts:7
