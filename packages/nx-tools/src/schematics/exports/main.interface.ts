import { Path } from '@angular-devkit/core'

import { GenerateExportsJinjaTemplateOptions } from '@src/templates'

// this is the one gets inputted from the command line
export interface Schema {
  root: string
  skipFormat: boolean
  silent: boolean
  template: GenerateExportsJinjaTemplateOptions
}

export interface NormalizedSchema {
  root: Path
  template: Schema['template']
}
