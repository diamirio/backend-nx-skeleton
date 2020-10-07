import { GenerateExportsJinjaTemplateOptions } from '@src/templates'

// this is the one gets inputted from the command line
export interface Schema {
  skipFormat?: boolean
  silent?: boolean
  template: GenerateExportsJinjaTemplateOptions
}

export interface NormalizedSchema {
  template: Schema['template']
}
