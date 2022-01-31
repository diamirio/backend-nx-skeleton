import type { AvailableLinterTypes, AvailableSchemaModes } from '@constants/available.constants'

import type { BaseIntegration } from '@integration/integration.interface'
import type { EnrichedProjectConfiguration } from '@interfaces/nx-json.interface'

export interface BarebonesSchema {
  /** Skip formatting action after initiation. */
  skipFormat?: boolean

  /** Force without user prompts wherever possible. */
  force?: boolean

  /** Put the generator to the silent mode. */
  silent?: boolean
}

export interface BaseSchemaName {
  /** Name of the project. */
  name?: string
}

export interface BaseSchemaParent {
  /** Name of the parent project. */
  parent?: string
}

export interface BaseSchemaDestination {
  /** Name of the project. */
  destination?: string
}

export interface BarebonesSchemaWithName extends BarebonesSchema, BaseSchemaName {}

export interface BaseSchemaWithParentAndConfigurationAndDestination extends BaseSchemaWithParentAndConfiguration, BaseSchemaDestination {}

export interface BaseSchema extends BarebonesSchema, BaseSchemaName {
  /** Directory of the project, if it is assigned to a subfolder. */
  directory?: string

  /** Preffered linter for the project. */
  linter?: AvailableLinterTypes
}

export interface BaseSchemaWithParent extends BaseSchema, BaseSchemaParent {}

export interface BaseSchemaWithParentAndConfiguration<Integration extends Record<string, any> = BaseIntegration> extends BaseSchemaWithParent {
  /** Name of the parent project. */
  parentProjectConfiguration?: EnrichedProjectConfiguration<Integration>
}

export interface BaseSchemaModes {
  /** Available modes for this generator. */
  mode?: AvailableSchemaModes
}

export interface BaseNormalizedSchemaPackageScope {
  /** Fetched package scope from workspace configuration. */
  packageScope: string
}

export interface BaseNormalizedSchemaPackageName extends BaseNormalizedSchemaPackageScope {
  /** Generated package name. */
  packageName: string
}

export interface BaseNormalizedSchemaRoot {
  /** Root directory for the generator. */
  root: string
}

export interface BaseNormalizedSchemaSrcRoot {
  /** Root directory of the source files. */
  sourceRoot: string
}

export interface BaseNormalizedSchema extends BaseNormalizedSchemaRoot, BaseNormalizedSchemaSrcRoot, BaseNormalizedSchemaPackageScope, BaseNormalizedSchemaPackageName {}

export interface BaseNormalizedSchemaWithParent<ParentPriorConfiguration extends Record<PropertyKey, any>>
  extends BaseNormalizedSchemaPackageScope,
  BaseNormalizedSchemaRoot,
  SchemaParentPriorConfiguration<ParentPriorConfiguration> {}

export type SchemaPriorConfiguration<T extends Record<PropertyKey, any>> = Record<'priorConfiguration', T>

export type SchemaParentPriorConfiguration<T extends Record<PropertyKey, any>> = Record<'parentPriorConfiguration', T>

export type SchemaExtensions<Extensions, ExtensionsType, Values extends boolean = false> = Partial<Record<'extensions', Values extends true ? Extensions[] : ExtensionsType>>

export type SelectParentApplicationFn<Integration extends Record<string, any>> = (name: string, project: EnrichedProjectConfiguration<Integration>) => boolean
