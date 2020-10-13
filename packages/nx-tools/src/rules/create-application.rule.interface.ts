import { Path } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'

import { SchematicFiles } from '@interfaces/schematic-files.interface'
import { MultipleJinjaTemplateOptions } from '@templates/template-engine.interface'
import { FormatFilesOptions } from '@utils'

/**
 * Generates application rules for many of the scheematics.
 */
export interface CreateApplicationRuleInterface {
  /**
   * Templates are used for generating templates.
   * Template names should be appended with __${NAME}__ to reduce confusion.
   *
   * Templates can be generated depending on the condition and if the condition is not met template will be skipped.
   *
   * If the template extension ends with jinja2 (".j2"), it will be evaluated as jinja templates with the passed in parsed options.
   *
   * If the template is a single file it will only be evaluated for condition and omitted if condition is not met.
   *
   * Templates can also be renamed on demand, where the field inside the underscores will be changed to whatever is designated,
   * elsewise the whole contraption of __${NAME}__ will be removed.
   */
  templates?: FileTemplatesInterface[]
  /**
   * Multiple templates is able to generate files from a single file.
   *
   * You can designate the template path, where the file will be generated from as a full path name in the source tree.
   *
   * Since every template should have different context, you can generate this configuration with the factory: (ctx?: T, output?: string) => T
   *
   * The file will be outputted to the path you designated.
   */
  multipleTemplates?: MultipleFileTemplatesInterface[]
  /**
   * This will evaluate the condition and if the condition is matched it will omit files or folders that match your file.
   */
  omit?: OmitInterface[]
  /**
   * This will trigger additional actions before moving the files in to designated file root.
   */
  trigger?: TriggerActionsInterface[]
  /**
   * Schematic files and folders to include based on condition
   */
  include?: SchematicFiles
  /**
   * You can either enable or disable to format inside the rule, since this is moslty required for diff-merge capabilites to be sure that spacing of code does not cause problems.
   */
  format?: boolean
}

export interface FileTemplatesInterface extends BaseWithCondition {
  match: string | RegExp
  rename?: string
}

export interface MultipleFileTemplatesInterface extends BaseWithCondition {
  templates?: MultipleJinjaTemplateOptions['templates']
}

export interface TriggerActionsInterface extends BaseWithCondition {
  rule: Rule | Rule[]
}

export interface OmitInterface extends BaseWithCondition {
  match: (file: Path) => boolean
}

export interface BaseCreateApplicationFilesOptions {
  root?: string
}

export interface CreateApplicationRuleOptions {
  format: FormatFilesOptions
}

interface BaseWithCondition {
  condition?: boolean
}
