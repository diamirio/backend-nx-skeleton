[@webundsoehne/nx-tools](../README.md) / EnrichedNxConfiguration

# Interface: EnrichedNxConfiguration<T\>

nx.json interface expanded before, although nx has changed configuration now, that removes this need we may need in future, so instead of importing NxJson from nx we can still use ours.

## Type parameters

| Name | Type                                                                                               |
| :--- | :------------------------------------------------------------------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> = [`BaseNxJsonIntegration`](../README.md#basenxjsonintegration) |

## Hierarchy

- `NxJsonConfiguration`

  ↳ **`EnrichedNxConfiguration`**

## Table of contents

### Properties

- [affected](EnrichedNxConfiguration.md#affected)
- [cli](EnrichedNxConfiguration.md#cli)
- [defaultProject](EnrichedNxConfiguration.md#defaultproject)
- [extends](EnrichedNxConfiguration.md#extends)
- [generators](EnrichedNxConfiguration.md#generators)
- [implicitDependencies](EnrichedNxConfiguration.md#implicitdependencies)
- [integration](EnrichedNxConfiguration.md#integration)
- [npmScope](EnrichedNxConfiguration.md#npmscope)
- [plugins](EnrichedNxConfiguration.md#plugins)
- [targetDependencies](EnrichedNxConfiguration.md#targetdependencies)
- [tasksRunnerOptions](EnrichedNxConfiguration.md#tasksrunneroptions)
- [workspaceLayout](EnrichedNxConfiguration.md#workspacelayout)

## Properties

### affected

• `Optional` **affected**: `NxAffectedConfig`

Default options for `nx affected`

#### Inherited from

NxJsonConfiguration.affected

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:38

---

### cli

• `Optional` **cli**: `Object`

Default generator collection. It is used when no collection is provided.

#### Type declaration

| Name                 | Type             |
| :------------------- | :--------------- |
| `defaultCollection?` | `string`         |
| `packageManager?`    | `PackageManager` |

#### Inherited from

NxJsonConfiguration.cli

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:86

---

### defaultProject

• `Optional` **defaultProject**: `string`

Default project. When project isn't provided, the default project will be used. Convenient for small workspaces with one main application.

#### Inherited from

NxJsonConfiguration.defaultProject

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:98

---

### extends

• `Optional` **extends**: `string`

Optional (additional) Nx.json configuration file which becomes a base for this one

#### Inherited from

NxJsonConfiguration.extends

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:22

---

### generators

• `Optional` **generators**: `Object`

List of default values used by generators.

These defaults are global. They are used when no other defaults are configured.

Example:

```
{
  "@nrwl/react": {
    "library": {
      "style": "scss"
    }
  }
}
```

#### Index signature

▪ [collectionName: `string`]: { [generatorName: string]: `any`; }

#### Inherited from

NxJsonConfiguration.generators

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:78

---

### implicitDependencies

• `Optional` **implicitDependencies**: `ImplicitDependencyEntry`<`string`[] \| `"*"`\>

Map of files to projects that implicitly depend on them

#### Inherited from

NxJsonConfiguration.implicitDependencies

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:26

---

### integration

• `Optional` **integration**: `T`

#### Defined in

packages/nx-tools/src/interfaces/nx-json.interface.ts:24

---

### npmScope

• **npmScope**: `string`

NPM Scope that the workspace uses

#### Inherited from

NxJsonConfiguration.npmScope

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:34

---

### plugins

• `Optional` **plugins**: `string`[]

Plugins for extending the project graph

#### Inherited from

NxJsonConfiguration.plugins

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:93

---

### targetDependencies

• `Optional` **targetDependencies**: `Record`<`string`, `TargetDependencyConfig`[]\>

Dependencies between different target names across all projects

#### Inherited from

NxJsonConfiguration.targetDependencies

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:30

---

### tasksRunnerOptions

• `Optional` **tasksRunnerOptions**: `Object`

Available Task Runners

#### Index signature

▪ [tasksRunnerName: `string`]: { `options?`: `any` ; `runner`: `string` }

#### Inherited from

NxJsonConfiguration.tasksRunnerOptions

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:49

---

### workspaceLayout

• `Optional` **workspaceLayout**: `Object`

Where new apps + libs should be placed

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `appsDir` | `string` |
| `libsDir` | `string` |

#### Inherited from

NxJsonConfiguration.workspaceLayout

#### Defined in

node_modules/@nrwl/tao/src/shared/nx.d.ts:42
