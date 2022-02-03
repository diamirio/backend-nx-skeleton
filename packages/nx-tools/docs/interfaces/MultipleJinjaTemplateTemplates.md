[@webundsoehne/nx-tools](../README.md) / MultipleJinjaTemplateTemplates

# Interface: MultipleJinjaTemplateTemplates<T\>

Options for multiple jinja templates.

## Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Table of contents

### Properties

- [output](MultipleJinjaTemplateTemplates.md#output)
- [path](MultipleJinjaTemplateTemplates.md#path)
- [root](MultipleJinjaTemplateTemplates.md#root)

### Methods

- [factory](MultipleJinjaTemplateTemplates.md#factory)

## Properties

### output

• **output**: `string`

Output path for generating multiple templates.

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:29

---

### path

• **path**: `string` \| `RegExp`

Path of the template that will be used.

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:27

---

### root

• `Optional` **root**: `string`

To move the file in to a given root directory after operations finished.

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:25

## Methods

### factory

▸ **factory**(`ctx?`, `output?`): `T`

Since everytemplate is indivudual, the template context can be generated through given ctx and output path.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `ctx?`    | `T`      |
| `output?` | `string` |

#### Returns

`T`

#### Defined in

packages/nx-tools/src/templates/template-engine.interface.ts:31
