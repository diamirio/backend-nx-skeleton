import { AvailableDBAdapters, AvailableLinterTypes } from '@interfaces/available.constants'
import { SchematicConstants } from '@src/interfaces'

/**
 * The options that it gets from angular-cli
 */
export interface Schema extends CommonPropertiesToSaveAndUse {
  name?: string
  linter?: AvailableLinterTypes
  skipFormat?: boolean
  silent?: boolean
}

/**
 * After the options has been normalized.
 */
export interface NormalizedSchema extends Schema {
  packageName: string
  packageScope: string
  root: string
  sourceRoot: string
  linter: AvailableLinterTypes
  constants: typeof SchematicConstants
  priorConfiguration: CommonPropertiesToSaveAndUse
  enum: { dbAdapters: typeof AvailableDBAdapters }
}

/**
 * This properties are shared across the input, normalized and saved configurations.
 */
interface CommonPropertiesToSaveAndUse {
  dbAdapters?: AvailableDBAdapters[]
}
