import { AvailableLibraryTypes } from '@interfaces/available.constants'
import { AvailableSchemaModes, AvailableLinterTypes, AvailableTestsTypes } from '@webundsoehne/nx-tools'
import { DeepPartial } from '@webundsoehne/ts-utility-types'

/**
 * This is the unparsed options list coming from angular-schematics
 */
export interface Schema extends CommonPropertiesToSaveAndUse<true> {
  name: string
  // options for schematic
  mode: AvailableSchemaModes
  directory: string
  linter: AvailableLinterTypes
  // injected options
  skipFormat: boolean
}

/**
 * This is the parsed options after normalizing options.
 * It can not extend the default schema because types are different after parsed
 */
export interface NormalizedSchema extends Schema {
  name: string
  // parsed internally
  packageName: string
  packageScope: string
  root: string
  sourceRoot: string
  // prior configuration will be written to nx.json for further processing
  priorConfiguration: DeepPartial<CommonPropertiesToSaveAndUse<true>>
}

interface CommonPropertiesToSaveAndUse<Values extends boolean = false> {
  type: Values extends true ? AvailableLibraryTypes : typeof AvailableLibraryTypes
  tests: Values extends true ? AvailableTestsTypes : typeof AvailableTestsTypes
}
