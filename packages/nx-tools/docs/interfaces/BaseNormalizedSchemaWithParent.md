[@webundsoehne/nx-tools](../README.md) / BaseNormalizedSchemaWithParent

# Interface: BaseNormalizedSchemaWithParent<ParentPriorConfiguration\>

## Type parameters

| Name                       | Type                                    |
| :------------------------- | :-------------------------------------- |
| `ParentPriorConfiguration` | extends `Record`<`PropertyKey`, `any`\> |

## Hierarchy

- [`BaseNormalizedSchemaPackageScope`](BaseNormalizedSchemaPackageScope.md)

- [`BaseNormalizedSchemaRoot`](BaseNormalizedSchemaRoot.md)

- [`SchemaParentPriorConfiguration`](../README.md#schemaparentpriorconfiguration)<`ParentPriorConfiguration`\>

  ↳ **`BaseNormalizedSchemaWithParent`**

## Table of contents

### Properties

- [packageScope](BaseNormalizedSchemaWithParent.md#packagescope)
- [parentPriorConfiguration](BaseNormalizedSchemaWithParent.md#parentpriorconfiguration)
- [root](BaseNormalizedSchemaWithParent.md#root)

## Properties

### packageScope

• **packageScope**: `string`

Fetched package scope from workspace configuration.

#### Inherited from

[BaseNormalizedSchemaPackageScope](BaseNormalizedSchemaPackageScope.md).[packageScope](BaseNormalizedSchemaPackageScope.md#packagescope)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:57

---

### parentPriorConfiguration

• **parentPriorConfiguration**: `ParentPriorConfiguration`

#### Inherited from

SchemaParentPriorConfiguration.parentPriorConfiguration

---

### root

• **root**: `string`

Root directory for the generator.

#### Inherited from

[BaseNormalizedSchemaRoot](BaseNormalizedSchemaRoot.md).[root](BaseNormalizedSchemaRoot.md#root)

#### Defined in

packages/nx-tools/src/interfaces/base-schemas.interface.ts:67
