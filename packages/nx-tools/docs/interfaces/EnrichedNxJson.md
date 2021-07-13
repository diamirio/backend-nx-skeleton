[@webundsoehne/nx-tools](../README.md) / EnrichedNxJson

# Interface: EnrichedNxJson<T\>

Improved nx.json with integration stuff.

## Type parameters

| Name | Type                 |
| :--- | :------------------- |
| `T`  | extends ` any``any ` |

## Hierarchy

- `NxJsonConfiguration`

  ↳ **`EnrichedNxJson`**

## Table of contents

### Properties

- [affected](EnrichedNxJson.md#affected)
- [implicitDependencies](EnrichedNxJson.md#implicitdependencies)
- [npmScope](EnrichedNxJson.md#npmscope)
- [plugins](EnrichedNxJson.md#plugins)
- [projects](EnrichedNxJson.md#projects)
- [targetDependencies](EnrichedNxJson.md#targetdependencies)
- [tasksRunnerOptions](EnrichedNxJson.md#tasksrunneroptions)
- [workspaceLayout](EnrichedNxJson.md#workspacelayout)

## Properties

### affected

• `Optional` **affected**: `NxAffectedConfig`

Default options for `nx affected`

#### Inherited from

NxJsonConfiguration.affected

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:33

---

### implicitDependencies

• `Optional` **implicitDependencies**: `ImplicitDependencyEntry`<`string`[] \| `"*"`\>

Map of files to projects that implicitly depend on them

#### Inherited from

NxJsonConfiguration.implicitDependencies

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:21

---

### npmScope

• **npmScope**: `string`

NPM Scope that the workspace uses

#### Inherited from

NxJsonConfiguration.npmScope

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:29

---

### plugins

• `Optional` **plugins**: `string`[]

Plugins for extending the project graph

#### Inherited from

NxJsonConfiguration.plugins

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:62

---

### projects

• **projects**: `Object`

#### Index signature

▪ [name: `string`]: `NxJsonProjectConfiguration` & { `brownie`: [`BrownieIntegrationInterface`](BrownieIntegrationInterface.md) ; `integration`: `T` }

#### Overrides

NxJsonConfiguration.projects

#### Defined in

packages/nx-tools/src/interfaces/nx-json.interface.ts:10

---

### targetDependencies

• `Optional` **targetDependencies**: `Record`<`string`, `TargetDependencyConfig`[]\>

Dependencies between different target names across all projects

#### Inherited from

NxJsonConfiguration.targetDependencies

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:25

---

### tasksRunnerOptions

• `Optional` **tasksRunnerOptions**: `Object`

Available Task Runners

#### Index signature

▪ [tasksRunnerName: `string`]: { `options?`: `any` ; `runner`: `string` }

#### Inherited from

NxJsonConfiguration.tasksRunnerOptions

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:47

---

### workspaceLayout

• `Optional` **workspaceLayout**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `appsDir` | `string` |
| `libsDir` | `string` |

#### Inherited from

NxJsonConfiguration.workspaceLayout

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:40
