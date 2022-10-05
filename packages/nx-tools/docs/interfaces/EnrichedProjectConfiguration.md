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
- [namedInputs](EnrichedProjectConfiguration.md#namedinputs)
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

▪ [collectionName: `string`]: { `[generatorName: string]`: `any`;  }

#### Inherited from

ProjectConfiguration.generators

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:79

___

### implicitDependencies

• `Optional` **implicitDependencies**: `string`[]

List of projects which are added as a dependency

#### Inherited from

ProjectConfiguration.implicitDependencies

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:87

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

node_modules/nx/src/config/workspace-json-project-json.d.ts:43

___

### namedInputs

• `Optional` **namedInputs**: `Object`

Named inputs targets can refer to reduce duplication

#### Index signature

▪ [inputName: `string`]: (`string` \| `InputDefinition`)[]

#### Inherited from

ProjectConfiguration.namedInputs

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:91

___

### projectType

• `Optional` **projectType**: `ProjectType`

Project type

#### Inherited from

ProjectConfiguration.projectType

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:61

___

### root

• **root**: `string`

Project's location relative to the root of the workspace

#### Inherited from

ProjectConfiguration.root

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:53

___

### sourceRoot

• `Optional` **sourceRoot**: `string`

The location of project's sources relative to the root of the workspace

#### Inherited from

ProjectConfiguration.sourceRoot

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:57

___

### tags

• `Optional` **tags**: `string`[]

List of tags used by nx-enforce-module-boundaries / project graph

#### Inherited from

ProjectConfiguration.tags

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:97

___

### targets

• `Optional` **targets**: `Object`

Project's targets

#### Index signature

▪ [targetName: `string`]: `TargetConfiguration`

#### Inherited from

ProjectConfiguration.targets

#### Defined in

node_modules/nx/src/config/workspace-json-project-json.d.ts:47
