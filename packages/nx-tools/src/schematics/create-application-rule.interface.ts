import { Path } from '@angular-devkit/core'

import { FormatFilesOptions } from '@utils/format-files.interface'
import { MultipleJinjaTemplateOptions } from '@utils/template-engine.interface'

export interface FileTemplatesInterface {
  condition: boolean
  match: string | RegExp
}

export interface OmitInterface {
  condition: boolean
  match: (file: Path) => boolean
}

export interface CreateApplicationRuleInterface {
  templates?: FileTemplatesInterface[]
  multipleTemplates?: MultipleJinjaTemplateOptions['templates']
  omit?: OmitInterface[]
}

export interface BaseCreateApplicationFilesOptions {
  name: string
  root: string
}

export interface CreateApplicationRuleOptions {
  format: FormatFilesOptions
}
