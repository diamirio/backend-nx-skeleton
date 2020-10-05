import { Path } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'

import { FormatFilesOptions } from '@utils/format-files.interface'
import { GenerateExportsJinjaTemplateOptions, MultipleJinjaTemplateOptions } from '@utils/template-engine.interface'

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
  name: string
  root: string
}

export interface CreateExportFilesOptions {
  condition?: boolean
  template: GenerateExportsJinjaTemplateOptions['templates']
}

export interface CreateApplicationRuleOptions {
  format: FormatFilesOptions
}
