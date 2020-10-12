import { Path } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'

import { MultipleJinjaTemplateOptions } from '@src/templates/template-engine.interface'
import { FormatFilesOptions } from '@src/utils/file-system/format-files.interface'

export interface CreateApplicationRuleInterface {
  templates?: FileTemplatesInterface[]
  multipleTemplates?: MultipleFileTemplatesInterface[]
  omit?: OmitInterface[]
  trigger?: TriggerActionsInterface[]
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

/**
 * TEST
 */
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
