import { GenerateExportsJinjaTemplateOptions } from '@src/rules'
import { GeneratedNameCases } from '@utils'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema<Type = string> {
  /** given name of the component */
  name: string

  /** type of the component that is available in files */
  type: Type | string

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
export interface NormalizedSchema<Inject = any, Type = string> extends Schema<Type> {
  root: string
  packageScope: string
  casing: GeneratedNameCases
  inject?: Inject
}
