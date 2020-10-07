import { Path } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'

import { GenerateExportsJinjaTemplateOptions, MultipleJinjaTemplateOptions } from '@src/templates/template-engine.interface'
import { FormatFilesOptions } from '@src/utils/file-system/format-files.interface'

export interface CreateApplicationRuleInterface {
  templates?: FileTemplatesInterface[]
  multipleTemplates?: MultipleFileTemplatesInterface[]
  omit?: OmitInterface[]
  trigger?: TriggerActionsInterface[]
  exports?: CreateExportFilesOptions[]
}

export interface FileTemplatesInterface extends BaseWithCondition {
  match: string | RegExp
  rename?: string
}

export interface MultipleFileTemplatesInterface extends BaseWithCondition {
  match: string | RegExp
  templates?: MultipleJinjaTemplateOptions['templates']
}

export interface TriggerActionsInterface extends BaseWithCondition {
  rule: Rule | Rule[]
}

export interface OmitInterface extends BaseWithCondition {
  match: (file: Path) => boolean
}

export interface BaseCreateApplicationFilesOptions {
  root: string
}

export interface CreateExportFilesOptions extends BaseWithCondition {
  template: GenerateExportsJinjaTemplateOptions['templates']
}

export interface CreateApplicationRuleOptions {
  format: FormatFilesOptions
}

interface BaseWithCondition {
  condition?: boolean
}
