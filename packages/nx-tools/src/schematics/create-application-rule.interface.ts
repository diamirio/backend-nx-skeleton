import { Path } from '@angular-devkit/core'

import { FormatFilesOptions } from '@utils/format-files.interface'

export interface FileTemplatesInterface {
  condition: boolean
  match: string | RegExp
}

export interface OmitFoldersInterface {
  condition: boolean
  match: (file: Path) => boolean
}

export interface CreateApplicationRuleInterface {
  templates?: FileTemplatesInterface[]
  omitFolders?: OmitFoldersInterface[]
}

export interface BaseCreateApplicationFilesOptions {
  name: string
  root: string
}

export interface CreateApplicationRuleOptions {
  format: FormatFilesOptions
}
