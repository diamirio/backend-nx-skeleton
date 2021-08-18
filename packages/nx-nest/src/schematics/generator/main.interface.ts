import { GeneratedNameCases, GenerateExportsJinjaTemplateOptions } from '@webundsoehne/nx-tools'

import { AvailableGenerators } from '@src/interfaces'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema {
  /** given name of the component */
  name: string

  /** type of the component that is available in files */
  type: AvailableGenerators | string

  /** directory of the generated component, defaults to process.cwd() */
  directory?: string

  /** enable or disable exporting from a file with a given pattern */
  exports?: GenerateExportsJinjaTemplateOptions['templates']

  skipFormat?: boolean

  force?: boolean

  silent?: boolean
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema extends Schema {
  root: string
  packageScope: string
  casing: GeneratedNameCases
}
