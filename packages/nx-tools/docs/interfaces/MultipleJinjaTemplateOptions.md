[@webundsoehne/nx-tools](../README.md) / MultipleJinjaTemplateOptions

# Interface: MultipleJinjaTemplateOptions<T\>

Generate multiple outputs from single jinja template with dynamic context.

## Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Table of contents

### Properties

- [nunjucks](MultipleJinjaTemplateOptions.md#nunjucks)
- [templates](MultipleJinjaTemplateOptions.md#templates)

## Properties

### nunjucks

• `Optional` **nunjucks**: `ConfigureOptions`

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:17

---

### templates

• **templates**: [`MultipleJinjaTemplateTemplates`](MultipleJinjaTemplateTemplates.md)<`T`\>[]

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:16
