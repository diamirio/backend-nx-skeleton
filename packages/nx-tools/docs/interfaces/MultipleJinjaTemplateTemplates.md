[@webundsoehne/nx-tools](../README.md) / MultipleJinjaTemplateTemplates

# Interface: MultipleJinjaTemplateTemplates<T\>

Options for multiple jinja templates.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Table of contents

### Properties

- [factory](MultipleJinjaTemplateTemplates.md#factory)
- [output](MultipleJinjaTemplateTemplates.md#output)
- [overwrite](MultipleJinjaTemplateTemplates.md#overwrite)
- [path](MultipleJinjaTemplateTemplates.md#path)
- [root](MultipleJinjaTemplateTemplates.md#root)

## Properties

### factory

• **factory**: (`ctx?`: `T`, `output?`: `string`) => `T`

#### Type declaration

▸ (`ctx?`, `output?`): `T`

Since everytemplate is individual, the template context can be generated through given ctx and output path.

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx?` | `T` |
| `output?` | `string` |

##### Returns

`T`

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:31

___

### output

• **output**: `string`

Output path for generating multiple templates.

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:29

___

### overwrite

• `Optional` **overwrite**: `boolean`

These templates can be one time templates, the option to overwrite can be set to false to skip rewriting existing template.

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:33

___

### path

• **path**: `string` \| `RegExp`

Path of the template that will be used.

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:27

___

### root

• `Optional` **root**: `string`

To move the file in to a given root directory after operations finished.

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:25
