import { BaseNormalizedSchemaPackageName, BaseSchemaWithParentAndDestination, EnrichedProjectConfiguration } from '@webundsoehne/nx-tools'

export interface Schema extends BaseSchemaWithParentAndDestination {
  importPath?: string
  updateImportPath?: boolean
}

export interface NormalizedSchema extends Schema, BaseNormalizedSchemaPackageName {
  project: EnrichedProjectConfiguration
}
