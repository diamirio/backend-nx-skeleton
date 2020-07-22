import { Path } from '@angular-devkit/core'

export interface FileTemplatesInterface {
  condition: boolean
  match: string | RegExp
}

export interface OmitFoldersInterface {
  condition: boolean
  match: (file: Path) => boolean
}