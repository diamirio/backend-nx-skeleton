import { AvailableLibraryTypes } from '@interfaces/available.constants'
import { AvailableTestsTypes, BaseNormalizedSchema, BaseSchema, BaseSchemaModes, SchemaPriorConfiguration } from '@webundsoehne/nx-tools'
import { DeepPartial } from '@webundsoehne/ts-utility-types'

/**
 * This is the unparsed options list coming from angular-schematics
 */
export interface Schema extends BaseSchema, BaseSchemaModes, CommonPropertiesToSaveAndUse<true> {}

/**
 * This is the parsed options after normalizing options.
 * It can not extend the default schema because types are different after parsed
 */
export interface NormalizedSchema extends BaseNormalizedSchema, Schema, SchemaPriorConfiguration<DeepPartial<CommonPropertiesToSaveAndUse<true>>> {
  enum: {
    type: typeof AvailableLibraryTypes
    tests: typeof AvailableTestsTypes
  }
}

interface CommonPropertiesToSaveAndUse<Values extends boolean = false> {
  type: Values extends true ? AvailableLibraryTypes : typeof AvailableLibraryTypes
  tests: Values extends true ? AvailableTestsTypes : typeof AvailableTestsTypes
}
