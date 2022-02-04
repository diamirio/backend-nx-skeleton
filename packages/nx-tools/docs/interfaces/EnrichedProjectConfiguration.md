[@webundsoehne/nx-tools](../README.md) / EnrichedProjectConfiguration

# Interface: EnrichedProjectConfiguration<T\>

Per application settings in workspace.json

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> = [`BaseIntegration`](../README.md#baseintegration) |

## Hierarchy

- `ProjectConfiguration`

  ↳ **`EnrichedProjectConfiguration`**

## Table of contents

### Properties

- [generators](EnrichedProjectConfiguration.md#generators)
- [implicitDependencies](EnrichedProjectConfiguration.md#implicitdependencies)
- [integration](EnrichedProjectConfiguration.md#integration)
- [name](EnrichedProjectConfiguration.md#name)
- [projectType](EnrichedProjectConfiguration.md#projecttype)
- [root](EnrichedProjectConfiguration.md#root)
- [sourceRoot](EnrichedProjectConfiguration.md#sourceroot)
- [tags](EnrichedProjectConfiguration.md#tags)
- [targets](EnrichedProjectConfiguration.md#targets)

## Properties

### generators

• `Optional` **generators**: `Object`

List of default values used by generators.

These defaults are project specific.

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

▪ [collectionName: `string`]: { [generatorName: string]: `any`;  }

#### Inherited from

ProjectConfiguration.generators

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:74

___

### implicitDependencies

• `Optional` **implicitDependencies**: `string`[]

List of projects which are added as a dependency

#### Inherited from

ProjectConfiguration.implicitDependencies

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:82

___

### integration

• `Optional` **integration**: `T`

#### Defined in

packages/nx-tools/src/interfaces/nx-json.interface.ts:16

___

### name

• `Optional` **name**: `string`

Project's name. Optional if specified in workspace.json

#### Inherited from

ProjectConfiguration.name

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:38

___

### projectType

• `Optional` **projectType**: `ProjectType`

Project type

#### Inherited from

ProjectConfiguration.projectType

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:56

___

### root

• **root**: `string`

Project's location relative to the root of the workspace

#### Inherited from

ProjectConfiguration.root

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:48

___

### sourceRoot

• `Optional` **sourceRoot**: `string`

The location of project's sources relative to the root of the workspace

#### Inherited from

ProjectConfiguration.sourceRoot

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:52

___

### tags

• `Optional` **tags**: `string`[]

List of tags used by nx-enforce-module-boundaries / project graph

#### Inherited from

ProjectConfiguration.tags

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:86

___

### targets

• `Optional` **targets**: `Object`

Project's targets

#### Index signature

▪ [targetName: `string`]: `TargetConfiguration`

#### Inherited from

ProjectConfiguration.targets

#### Defined in

node_modules/@nrwl/tao/src/shared/workspace.d.ts:42
