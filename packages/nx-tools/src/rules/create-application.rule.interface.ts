import { Path } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'

import { GenerateExportsJinjaTemplateOptions, MultipleJinjaTemplateOptions } from '@src/templates/template-engine.interface'
import { FormatFilesOptions } from '@src/utils/file-system/format-files.interface'

export interface CreateApplicationRuleInterface {
  templates?: FileTemplatesInterface[]
  multipleTemplates?: MultipleJinjaTemplateOptions['templates']
  omit?: OmitInterface[]
  trigger?: TriggerActionsInterface[]
  exports?: CreateExportFilesOptions[]
}

export interface FileTemplatesInterface {
  condition: boolean
  match: string | RegExp
  rename?: string
}

export interface TriggerActionsInterface {
  condition?: boolean
  rule: Rule | Rule[]
}

export interface OmitInterface {
  condition: boolean
  match: (file: Path) => boolean
}

export interface BaseCreateApplicationFilesOptions {
  root: string
}

export interface CreateExportFilesOptions {
  condition?: boolean
  template: GenerateExportsJinjaTemplateOptions['templates']
}

export interface CreateApplicationRuleOptions {
  format: FormatFilesOptions
}
