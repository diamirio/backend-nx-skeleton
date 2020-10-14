import { GenerateExportsJinjaTemplateOptions } from '@rules/generate-exports.rule.interface'

// this is the one gets inputted from the command line
export interface Schema {
  skipFormat?: boolean
  silent?: boolean
  templates: GenerateExportsJinjaTemplateOptions
}

export interface NormalizedSchema extends Schema {
  templates: Schema['templates']
}
