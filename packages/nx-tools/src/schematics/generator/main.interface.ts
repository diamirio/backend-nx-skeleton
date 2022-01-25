import { BaseNormalizedSchemaPackageScope, BaseNormalizedSchemaRoot, BaseSchema } from '@interfaces/base-schemas.interface'
import { GenerateExportsJinjaTemplateOptions } from '@rules'
import { GeneratedNameCases } from '@utils'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema<Type = string> extends BaseSchema {
  /** type of the component that is available in files */
  type: Type | string

  /** enable or disable exporting from a file with a given pattern */
  exports?: GenerateExportsJinjaTemplateOptions['templates']
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema<Inject = any, Type = string> extends Schema<Type>, BaseNormalizedSchemaRoot, BaseNormalizedSchemaPackageScope {
  casing: GeneratedNameCases
  inject?: Inject
}
