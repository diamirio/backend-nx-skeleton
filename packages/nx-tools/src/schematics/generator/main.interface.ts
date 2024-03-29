import type { BaseNormalizedSchemaPackageScope, BaseNormalizedSchemaRoot, BaseSchema } from '@interfaces/base-schemas.interface'
import type { GenerateExportsJinjaTemplateOptions } from '@rules'
import type { GeneratedNameCases } from '@utils'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema<Inject = any, Type = string> extends BaseSchema {
  /** type of the component that is available in files */
  type: Type | string

  /** enable or disable exporting from a file with a given pattern */
  exports?: GenerateExportsJinjaTemplateOptions['templates']

  inject?: Inject
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema<Inject = any, Type = string> extends Schema<Inject, Type>, BaseNormalizedSchemaRoot, BaseNormalizedSchemaPackageScope {
  casing: GeneratedNameCases
}
