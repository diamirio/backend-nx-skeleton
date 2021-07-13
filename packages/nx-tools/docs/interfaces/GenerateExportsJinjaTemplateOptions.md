[@webundsoehne/nx-tools](../README.md) / GenerateExportsJinjaTemplateOptions

# Interface: GenerateExportsJinjaTemplateOptions

Generates exports from matching patterns in to a output file like index.ts

## Table of contents

### Properties

- [nunjucks](GenerateExportsJinjaTemplateOptions.md#nunjucks)
- [root](GenerateExportsJinjaTemplateOptions.md#root)
- [templates](GenerateExportsJinjaTemplateOptions.md#templates)

## Properties

### nunjucks

• `Optional` **nunjucks**: `ConfigureOptions`

#### Defined in

packages/nx-tools/src/rules/generate-exports.rule.interface.ts:19

---

### root

• **root**: `string`

It will move the template to given root after it is generated.

#### Defined in

packages/nx-tools/src/rules/generate-exports.rule.interface.ts:9

---

### templates

• **templates**: { `cwd?`: `string` ; `options?`: `Options` ; `output`: `string` ; `pattern`: `string` \| `string`[] }[]

#### Defined in

packages/nx-tools/src/rules/generate-exports.rule.interface.ts:10
