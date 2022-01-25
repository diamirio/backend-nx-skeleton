import { AvailableLinterTypes, AvailableSchemaModes } from '@constants/available.constants'

import { BaseIntegration } from '@integration/integration.interface'
import { EnrichedProjectConfiguration } from '@interfaces/nx-json.interface'

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

export interface BaseSchemaWithParent extends BarebonesSchema, BaseSchemaParent {}

export interface BaseSchemaWithParentAndDestination extends BaseSchemaWithParent, BaseSchemaDestination {}

export interface BaseSchema extends BarebonesSchema, BaseSchemaName {
  /** Directory of the project, if it is assigned to a subfolder. */
  directory?: string

  /** Preffered linter for the project. */
  linter?: AvailableLinterTypes
}

export interface BaseSchemaWithParent<Integration extends Record<string, any> = BaseIntegration> extends BaseSchema, BaseSchemaParent {
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

export type SelectParentApplicationFn<Integration extends Record<string, any>> = (name: string, project: EnrichedProjectConfiguration<Integration>) => boolean
