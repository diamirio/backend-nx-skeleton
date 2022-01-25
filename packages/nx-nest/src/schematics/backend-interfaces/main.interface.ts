import { SchematicConstants } from '@interfaces'
import { AvailableDBAdapters } from '@interfaces/available.constants'
import { BaseNormalizedSchema, BaseSchema, SchemaPriorConfiguration } from '@webundsoehne/nx-tools'

/**
 * The options that it gets from angular-cli
 */
export interface Schema extends BaseSchema, CommonPropertiesToSaveAndUse {}

/**
 * After the options has been normalized.
 */
export interface NormalizedSchema extends Schema, BaseNormalizedSchema, SchemaPriorConfiguration<CommonPropertiesToSaveAndUse> {
  constants: typeof SchematicConstants
  enum: { dbAdapters: typeof AvailableDBAdapters }
}

/**
 * This properties are shared across the input, normalized and saved configurations.
 */
interface CommonPropertiesToSaveAndUse {
  dbAdapters?: AvailableDBAdapters[]
}
