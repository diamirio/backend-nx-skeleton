[@webundsoehne/nx-tools](../README.md) / BaseNormalizedSchema

# Interface: BaseNormalizedSchema

## Hierarchy

- [`BaseNormalizedSchemaRoot`](BaseNormalizedSchemaRoot.md)

- [`BaseNormalizedSchemaSrcRoot`](BaseNormalizedSchemaSrcRoot.md)

- [`BaseNormalizedSchemaPackageScope`](BaseNormalizedSchemaPackageScope.md)

- [`BaseNormalizedSchemaPackageName`](BaseNormalizedSchemaPackageName.md)

  ↳ **`BaseNormalizedSchema`**

## Table of contents

### Properties

- [packageName](BaseNormalizedSchema.md#packagename)
- [packageScope](BaseNormalizedSchema.md#packagescope)
- [root](BaseNormalizedSchema.md#root)
- [sourceRoot](BaseNormalizedSchema.md#sourceroot)

## Properties

### packageName

• **packageName**: `string`

Generated package name.

#### Inherited from

[BaseNormalizedSchemaPackageName](BaseNormalizedSchemaPackageName.md).[packageName](BaseNormalizedSchemaPackageName.md#packagename)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:62

---

### packageScope

• **packageScope**: `string`

Fetched package scope from workspace configuration.

#### Inherited from

[BaseNormalizedSchemaPackageName](BaseNormalizedSchemaPackageName.md).[packageScope](BaseNormalizedSchemaPackageName.md#packagescope)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:57

---

### root

• **root**: `string`

Root directory for the generator.

#### Inherited from

[BaseNormalizedSchemaRoot](BaseNormalizedSchemaRoot.md).[root](BaseNormalizedSchemaRoot.md#root)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:67

---

### sourceRoot

• **sourceRoot**: `string`

Root directory of the source files.

#### Inherited from

[BaseNormalizedSchemaSrcRoot](BaseNormalizedSchemaSrcRoot.md).[sourceRoot](BaseNormalizedSchemaSrcRoot.md#sourceroot)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:72
