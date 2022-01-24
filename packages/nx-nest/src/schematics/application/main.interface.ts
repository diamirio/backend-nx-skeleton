import { AvailableComponents, AvailableDBTypes, AvailableServerTypes, AvailableMicroserviceTypes, AvailableDBAdapters, AvailableExtensions } from '@interfaces/available.constants'
import { SchematicConstants } from '@interfaces/constants'
import { GeneratedMicroserviceCasing } from '@utils/generate-microservice-casing.interface'
import { AvailableLinterTypes, AvailableSchemaModes, AvailableTestsTypes, GeneratedNameCases } from '@webundsoehne/nx-tools'
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
  // parsed internally
  packageName: string
  packageScope: string
  root: string
  sourceRoot: string
  casing: GeneratedNameCases
  injectedCasing?: { microservice?: GeneratedMicroserviceCasing }
  microserviceCasing?: Record<string, GeneratedMicroserviceCasing>
  constants: typeof SchematicConstants
  // prior configuration will be written to nx.json for further processing
  priorConfiguration: DeepPartial<CommonPropertiesToSaveAndUse<true>>
  // injecting enums since i want to compare this in jinja templates
  enum: Omit<CommonPropertiesToSaveAndUse<false>, 'microserviceClient' | 'effectiveComponents'>
}

interface CommonPropertiesToSaveAndUse<Values extends boolean = false> {
  components: Values extends true ? AvailableComponents[] : typeof AvailableComponents
  effectiveComponents: number
  server: Values extends true ? AvailableServerTypes : typeof AvailableServerTypes
  microservice: Values extends true ? AvailableMicroserviceTypes : typeof AvailableMicroserviceTypes
  microserviceClient: string[]
  database: Values extends true ? AvailableDBTypes : typeof AvailableDBTypes
  dbAdapters: Values extends true ? AvailableDBAdapters : typeof AvailableDBAdapters
  tests: Values extends true ? AvailableTestsTypes : typeof AvailableTestsTypes
  extensions: Values extends true ? AvailableExtensions[] : typeof AvailableExtensions
}
