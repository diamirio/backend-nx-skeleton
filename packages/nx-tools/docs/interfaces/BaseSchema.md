[@webundsoehne/nx-tools](../README.md) / BaseSchema

# Interface: BaseSchema

## Hierarchy

- [`BarebonesSchema`](BarebonesSchema.md)

- [`BaseSchemaName`](BaseSchemaName.md)

  ↳ **`BaseSchema`**

  ↳↳ [`BaseSchemaWithParent`](BaseSchemaWithParent.md)

## Table of contents

### Properties

- [directory](BaseSchema.md#directory)
- [force](BaseSchema.md#force)
- [linter](BaseSchema.md#linter)
- [name](BaseSchema.md#name)
- [silent](BaseSchema.md#silent)
- [skipFormat](BaseSchema.md#skipformat)

## Properties

### directory

• `Optional` **directory**: `string`

Directory of the project, if it is assigned to a subfolder.

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:37

___

### force

• `Optional` **force**: `boolean`

Force without user prompts wherever possible.

#### Inherited from

[BarebonesSchema](BarebonesSchema.md).[force](BarebonesSchema.md#force)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:10

___

### linter

• `Optional` **linter**: [`AvailableLinterTypes`](../enums/AvailableLinterTypes.md)

Preffered linter for the project.

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:40

___

### name

• `Optional` **name**: `string`

Name of the project.

#### Inherited from

[BaseSchemaName](BaseSchemaName.md).[name](BaseSchemaName.md#name)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:18

___

### silent

• `Optional` **silent**: `boolean`

Put the generator to the silent mode.

#### Inherited from

[BarebonesSchema](BarebonesSchema.md).[silent](BarebonesSchema.md#silent)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:13

___

### skipFormat

• `Optional` **skipFormat**: `boolean`

Skip formatting action after initiation.

#### Inherited from

[BarebonesSchema](BarebonesSchema.md).[skipFormat](BarebonesSchema.md#skipformat)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:7
