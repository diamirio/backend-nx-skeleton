[@webundsoehne/nx-tools](../README.md) / EnrichedWorkspaceConfiguration

# Interface: EnrichedWorkspaceConfiguration<T\>

Nx does not import a type for workspace.json. This fills that gap.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> = [`BaseIntegration`](../README.md#baseintegration) |

## Hierarchy

- `WorkspaceConfiguration`

  ↳ **`EnrichedWorkspaceConfiguration`**

## Table of contents

### Properties

- [affected](EnrichedWorkspaceConfiguration.md#affected)
- [cli](EnrichedWorkspaceConfiguration.md#cli)
- [defaultProject](EnrichedWorkspaceConfiguration.md#defaultproject)
- [extends](EnrichedWorkspaceConfiguration.md#extends)
- [generators](EnrichedWorkspaceConfiguration.md#generators)
- [implicitDependencies](EnrichedWorkspaceConfiguration.md#implicitdependencies)
- [npmScope](EnrichedWorkspaceConfiguration.md#npmscope)
- [plugins](EnrichedWorkspaceConfiguration.md#plugins)
- [pluginsConfig](EnrichedWorkspaceConfiguration.md#pluginsconfig)
- [projects](EnrichedWorkspaceConfiguration.md#projects)
- [targetDependencies](EnrichedWorkspaceConfiguration.md#targetdependencies)
- [tasksRunnerOptions](EnrichedWorkspaceConfiguration.md#tasksrunneroptions)
- [version](EnrichedWorkspaceConfiguration.md#version)
- [workspaceLayout](EnrichedWorkspaceConfiguration.md#workspacelayout)

## Properties

### affected

• `Optional` **affected**: `NxAffectedConfig`

Default options for `nx affected`

#### Inherited from

WorkspaceConfiguration.affected

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:38

___

### cli

• `Optional` **cli**: `Object`

Default generator collection. It is used when no collection is provided.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultCollection?` | `string` |
| `defaultProjectName?` | `string` |
| `packageManager?` | `PackageManager` |

#### Inherited from

WorkspaceConfiguration.cli

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:86

___

### defaultProject

• `Optional` **defaultProject**: `string`

Default project. When project isn't provided, the default project
will be used. Convenient for small workspaces with one main application.

#### Inherited from

WorkspaceConfiguration.defaultProject

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:103

___

### extends

• `Optional` **extends**: `string`

Optional (additional) Nx.json configuration file which becomes a base for this one

#### Inherited from

WorkspaceConfiguration.extends

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:22

___

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

▪ [collectionName: `string`]: { `[generatorName: string]`: `any`;  }

#### Inherited from

WorkspaceConfiguration.generators

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:78

___

### implicitDependencies

• `Optional` **implicitDependencies**: `ImplicitDependencyEntry`<`string`[] \| ``"*"``\>

Map of files to projects that implicitly depend on them

#### Inherited from

WorkspaceConfiguration.implicitDependencies

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:26

___

### npmScope

• `Optional` **npmScope**: `string`

NPM Scope that the workspace uses

#### Inherited from

WorkspaceConfiguration.npmScope

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:34

___

### plugins

• `Optional` **plugins**: `string`[]

Plugins for extending the project graph

#### Inherited from

WorkspaceConfiguration.plugins

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:94

___

### pluginsConfig

• `Optional` **pluginsConfig**: `Record`<`string`, `unknown`\>

Configuration for Nx Plugins

#### Inherited from

WorkspaceConfiguration.pluginsConfig

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:98

___

### projects

• **projects**: `Record`<`string`, `string`\> \| [`EnrichedProjectConfiguration`](EnrichedProjectConfiguration.md)<`T`\>

#### Defined in

packages/nx-tools/src/interfaces/nx-json.interface.ts:9

___

### targetDependencies

• `Optional` **targetDependencies**: `Record`<`string`, `TargetDependencyConfig`[]\>

Dependencies between different target names across all projects

#### Inherited from

WorkspaceConfiguration.targetDependencies

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:30

___

### tasksRunnerOptions

• `Optional` **tasksRunnerOptions**: `Object`

Available Task Runners

#### Index signature

▪ [tasksRunnerName: `string`]: { `options?`: `any` ; `runner`: `string`  }

#### Inherited from

WorkspaceConfiguration.tasksRunnerOptions

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:49

___

### version

• **version**: `number`

Version of the configuration format

#### Inherited from

WorkspaceConfiguration.version

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:12

___

### workspaceLayout

• `Optional` **workspaceLayout**: `Object`

Where new apps + libs should be placed

#### Type declaration

| Name | Type |
| :------ | :------ |
| `appsDir` | `string` |
| `libsDir` | `string` |

#### Inherited from

WorkspaceConfiguration.workspaceLayout

#### Defined in

node_modules/nx/src/config/nx-json.d.ts:42
