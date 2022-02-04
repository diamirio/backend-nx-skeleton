[@webundsoehne/nx-tools](../README.md) / BaseSchemaWithParentAndConfigurationAndDestination

# Interface: BaseSchemaWithParentAndConfigurationAndDestination

## Hierarchy

- [`BaseSchemaWithParentAndConfiguration`](BaseSchemaWithParentAndConfiguration.md)

- [`BaseSchemaDestination`](BaseSchemaDestination.md)

  ↳ **`BaseSchemaWithParentAndConfigurationAndDestination`**

## Table of contents

### Properties

- [destination](BaseSchemaWithParentAndConfigurationAndDestination.md#destination)
- [directory](BaseSchemaWithParentAndConfigurationAndDestination.md#directory)
- [force](BaseSchemaWithParentAndConfigurationAndDestination.md#force)
- [linter](BaseSchemaWithParentAndConfigurationAndDestination.md#linter)
- [name](BaseSchemaWithParentAndConfigurationAndDestination.md#name)
- [parent](BaseSchemaWithParentAndConfigurationAndDestination.md#parent)
- [parentProjectConfiguration](BaseSchemaWithParentAndConfigurationAndDestination.md#parentprojectconfiguration)
- [silent](BaseSchemaWithParentAndConfigurationAndDestination.md#silent)
- [skipFormat](BaseSchemaWithParentAndConfigurationAndDestination.md#skipformat)

## Properties

### destination

• `Optional` **destination**: `string`

Name of the project.

#### Inherited from

[BaseSchemaDestination](BaseSchemaDestination.md).[destination](BaseSchemaDestination.md#destination)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:28

___

### directory

• `Optional` **directory**: `string`

Directory of the project, if it is assigned to a subfolder.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[directory](BaseSchemaWithParentAndConfiguration.md#directory)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:37

___

### force

• `Optional` **force**: `boolean`

Force without user prompts wherever possible.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[force](BaseSchemaWithParentAndConfiguration.md#force)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:10

___

### linter

• `Optional` **linter**: [`AvailableLinterTypes`](../enums/AvailableLinterTypes.md)

Preffered linter for the project.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[linter](BaseSchemaWithParentAndConfiguration.md#linter)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:40

___

### name

• `Optional` **name**: `string`

Name of the project.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[name](BaseSchemaWithParentAndConfiguration.md#name)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:18

___

### parent

• `Optional` **parent**: `string`

Name of the parent project.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[parent](BaseSchemaWithParentAndConfiguration.md#parent)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:23

___

### parentProjectConfiguration

• `Optional` **parentProjectConfiguration**: [`EnrichedProjectConfiguration`](EnrichedProjectConfiguration.md)<`Partial`<`Integration`\>\>

Name of the parent project.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[parentProjectConfiguration](BaseSchemaWithParentAndConfiguration.md#parentprojectconfiguration)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:47

___

### silent

• `Optional` **silent**: `boolean`

Put the generator to the silent mode.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[silent](BaseSchemaWithParentAndConfiguration.md#silent)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:13

___

### skipFormat

• `Optional` **skipFormat**: `boolean`

Skip formatting action after initiation.

#### Inherited from

[BaseSchemaWithParentAndConfiguration](BaseSchemaWithParentAndConfiguration.md).[skipFormat](BaseSchemaWithParentAndConfiguration.md#skipformat)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:7
