import { Path } from '@angular-devkit/core'
import { Rule } from '@angular-devkit/schematics'

import { FormatFilesOptions } from '@utils/format-files.interface'
import { MultipleJinjaTemplateOptions } from '@utils/template-engine.interface'

export interface CreateApplicationRuleInterface {
  templates?: FileTemplatesInterface[]
  multipleTemplates?: MultipleJinjaTemplateOptions['templates']
  omit?: OmitInterface[]
  trigger?: TriggerActionsInterface[]
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

export interface CreateApplicationRuleOptions {
  format: FormatFilesOptions
}
