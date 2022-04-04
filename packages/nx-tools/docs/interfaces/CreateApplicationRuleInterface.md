[@webundsoehne/nx-tools](../README.md) / CreateApplicationRuleInterface

# Interface: CreateApplicationRuleInterface

Generates application rules for many of the scheematics.

## Table of contents

### Properties

- [format](CreateApplicationRuleInterface.md#format)
- [include](CreateApplicationRuleInterface.md#include)
- [multipleTemplates](CreateApplicationRuleInterface.md#multipletemplates)
- [omit](CreateApplicationRuleInterface.md#omit)
- [templates](CreateApplicationRuleInterface.md#templates)
- [trigger](CreateApplicationRuleInterface.md#trigger)

## Properties

### format

• `Optional` **format**: `boolean`

You can either enable or disable to format inside the rule, since this is moslty required for diff-merge capabilities to be sure that spacing of code does not cause problems.

#### Defined in

packages/nx-tools/src/rules/create-application.rule.interface.ts:51

___

### include

• `Optional` **include**: [`SchematicFiles`](../README.md#schematicfiles)

Schematic files and folders to include based on condition

#### Defined in

packages/nx-tools/src/rules/create-application.rule.interface.ts:47

___

### multipleTemplates

• `Optional` **multipleTemplates**: [`MultipleFileTemplatesInterface`](MultipleFileTemplatesInterface.md)[]

Multiple templates is able to generate files from a single file.

You can designate the template path, where the file will be generated from as a full path name in the source tree.

Since every template should have different context, you can generate this configuration with the factory: (ctx?: T, output?: string) => T

The file will be outputted to the path you designated.

#### Defined in

packages/nx-tools/src/rules/create-application.rule.interface.ts:35

___

### omit

• `Optional` **omit**: [`OmitInterface`](OmitInterface.md)[]

This will evaluate the condition and if the condition is matched it will omit files or folders that match your file.

#### Defined in

packages/nx-tools/src/rules/create-application.rule.interface.ts:39

___

### templates

• `Optional` **templates**: [`FileTemplatesInterface`](FileTemplatesInterface.md)[]

Templates are used for generating templates.
Template names should be appended with __${NAME}__ to reduce confusion.

Templates can be generated depending on the condition and if the condition is not met template will be skipped.

If the template extension ends with jinja2 (".j2"), it will be evaluated as jinja templates with the passed in parsed options.

If the template is a single file it will only be evaluated for condition and omitted if condition is not met.

Templates can also be renamed on demand, where the field inside the underscores will be changed to whatever is designated,
elsewise the whole contraption of __${NAME}__ will be removed.

#### Defined in

packages/nx-tools/src/rules/create-application.rule.interface.ts:25

___

### trigger

• `Optional` **trigger**: [`TriggerActionsInterface`](TriggerActionsInterface.md)[]

This will trigger additional actions before moving the files in to designated file root.

#### Defined in

packages/nx-tools/src/rules/create-application.rule.interface.ts:43
