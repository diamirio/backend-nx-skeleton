[@webundsoehne/nx-tools](../README.md) / BaseSchemaWithParentAndConfiguration

# Interface: BaseSchemaWithParentAndConfiguration<Integration\>

## Type parameters

| Name          | Type                                                                                   |
| :------------ | :------------------------------------------------------------------------------------- |
| `Integration` | extends `Record`<`string`, `any`\> = [`BaseIntegration`](../README.md#baseintegration) |

## Hierarchy

- [`BaseSchemaWithParent`](BaseSchemaWithParent.md)

  ↳ **`BaseSchemaWithParentAndConfiguration`**

  ↳↳ [`BaseSchemaWithParentAndConfigurationAndDestination`](BaseSchemaWithParentAndConfigurationAndDestination.md)

## Table of contents

### Properties

- [directory](BaseSchemaWithParentAndConfiguration.md#directory)
- [force](BaseSchemaWithParentAndConfiguration.md#force)
- [linter](BaseSchemaWithParentAndConfiguration.md#linter)
- [name](BaseSchemaWithParentAndConfiguration.md#name)
- [parent](BaseSchemaWithParentAndConfiguration.md#parent)
- [parentProjectConfiguration](BaseSchemaWithParentAndConfiguration.md#parentprojectconfiguration)
- [silent](BaseSchemaWithParentAndConfiguration.md#silent)
- [skipFormat](BaseSchemaWithParentAndConfiguration.md#skipformat)

## Properties

### directory

• `Optional` **directory**: `string`

Directory of the project, if it is assigned to a subfolder.

#### Inherited from

[BaseSchemaWithParent](BaseSchemaWithParent.md).[directory](BaseSchemaWithParent.md#directory)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:37

---

### force

• `Optional` **force**: `boolean`

Force without user prompts wherever possible.

#### Inherited from

[BaseSchemaWithParent](BaseSchemaWithParent.md).[force](BaseSchemaWithParent.md#force)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:10

---

### linter

• `Optional` **linter**: [`AvailableLinterTypes`](../enums/AvailableLinterTypes.md)

Preffered linter for the project.

#### Inherited from

[BaseSchemaWithParent](BaseSchemaWithParent.md).[linter](BaseSchemaWithParent.md#linter)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:40

---

### name

• `Optional` **name**: `string`

Name of the project.

#### Inherited from

[BaseSchemaWithParent](BaseSchemaWithParent.md).[name](BaseSchemaWithParent.md#name)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:18

---

### parent

• `Optional` **parent**: `string`

Name of the parent project.

#### Inherited from

[BaseSchemaWithParent](BaseSchemaWithParent.md).[parent](BaseSchemaWithParent.md#parent)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:23

---

### parentProjectConfiguration

• `Optional` **parentProjectConfiguration**: [`EnrichedProjectConfiguration`](EnrichedProjectConfiguration.md)<`Integration`\>

Name of the parent project.

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:47

---

### silent

• `Optional` **silent**: `boolean`

Put the generator to the silent mode.

#### Inherited from

[BaseSchemaWithParent](BaseSchemaWithParent.md).[silent](BaseSchemaWithParent.md#silent)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:13

---

### skipFormat

• `Optional` **skipFormat**: `boolean`

Skip formatting action after initiation.

#### Inherited from

[BaseSchemaWithParent](BaseSchemaWithParent.md).[skipFormat](BaseSchemaWithParent.md#skipformat)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:7
