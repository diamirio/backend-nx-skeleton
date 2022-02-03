[@webundsoehne/nx-tools](../README.md) / FormatFilesOptions

# Interface: FormatFilesOptions

Format files as a rule in a tree.

Requires configuration to be present in the current tree.

Will use prettier first, others after.

## Table of contents

### Properties

- [eslint](FormatFilesOptions.md#eslint)
- [prettier](FormatFilesOptions.md#prettier)
- [skip](FormatFilesOptions.md#skip)

## Properties

### eslint

• `Optional` **eslint**: `boolean`

Use eslint

#### Defined in

packages/nx-tools/src/utils/file-system/format-files.interface.ts:14

---

### prettier

• `Optional` **prettier**: `boolean`

Use prettier

#### Defined in

packages/nx-tools/src/utils/file-system/format-files.interface.ts:12

---

### skip

• `Optional` **skip**: `boolean`

A condition that can skip the formatting.

#### Defined in

packages/nx-tools/src/utils/file-system/format-files.interface.ts:10
