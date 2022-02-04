[@webundsoehne/nx-tools](../README.md) / BaseSchemaWithParent

# Interface: BaseSchemaWithParent

## Hierarchy

- [`BaseSchema`](BaseSchema.md)

- [`BaseSchemaParent`](BaseSchemaParent.md)

  ↳ **`BaseSchemaWithParent`**

  ↳↳ [`BaseSchemaWithParentAndConfiguration`](BaseSchemaWithParentAndConfiguration.md)

## Table of contents

### Properties

- [directory](BaseSchemaWithParent.md#directory)
- [force](BaseSchemaWithParent.md#force)
- [linter](BaseSchemaWithParent.md#linter)
- [name](BaseSchemaWithParent.md#name)
- [parent](BaseSchemaWithParent.md#parent)
- [silent](BaseSchemaWithParent.md#silent)
- [skipFormat](BaseSchemaWithParent.md#skipformat)

## Properties

### directory

• `Optional` **directory**: `string`

Directory of the project, if it is assigned to a subfolder.

#### Inherited from

[BaseSchema](BaseSchema.md).[directory](BaseSchema.md#directory)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:37

---

### force

• `Optional` **force**: `boolean`

Force without user prompts wherever possible.

#### Inherited from

[BaseSchema](BaseSchema.md).[force](BaseSchema.md#force)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:10

---

### linter

• `Optional` **linter**: [`AvailableLinterTypes`](../enums/AvailableLinterTypes.md)

Preffered linter for the project.

#### Inherited from

[BaseSchema](BaseSchema.md).[linter](BaseSchema.md#linter)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:40

---

### name

• `Optional` **name**: `string`

Name of the project.

#### Inherited from

[BaseSchema](BaseSchema.md).[name](BaseSchema.md#name)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:18

---

### parent

• `Optional` **parent**: `string`

Name of the parent project.

#### Inherited from

[BaseSchemaParent](BaseSchemaParent.md).[parent](BaseSchemaParent.md#parent)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:23

---

### silent

• `Optional` **silent**: `boolean`

Put the generator to the silent mode.

#### Inherited from

[BaseSchema](BaseSchema.md).[silent](BaseSchema.md#silent)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:13

---

### skipFormat

• `Optional` **skipFormat**: `boolean`

Skip formatting action after initiation.

#### Inherited from

[BaseSchema](BaseSchema.md).[skipFormat](BaseSchema.md#skipformat)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:7
