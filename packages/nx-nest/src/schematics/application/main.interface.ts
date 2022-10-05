import type {
  AvailableComponents,
  AvailableDBAdapters,
  AvailableDBTypes,
  AvailableExtensions,
  AvailableMicroserviceTypes,
  AvailableServerAdapters,
  AvailableServerTypes
} from '@interfaces/available.constants'
import type { SchematicConstants } from '@interfaces/constants'
import type { GeneratedMicroserviceCasing } from '@utils/generate-microservice-casing.interface'
import type {
  AvailableTestsTypes,
  BaseNormalizedSchema,
  BaseSchema,
  BaseSchemaModes,
  GeneratedNameCases,
  SchemaExtensions,
  SchemaPriorConfiguration
} from '@webundsoehne/nx-tools'
import type { DeepPartial } from '@webundsoehne/ts-utility-types'

/**
 * This is the unparsed options list coming from angular-schematics
 */
export interface Schema extends BaseSchema, BaseSchemaModes {}

/**
 * This is the parsed options after normalizing options.
 * It can not extend the default schema because types are different after parsed
 */
export interface NormalizedSchema
  extends Schema,
  BaseNormalizedSchema,
  CommonPropertiesToSaveAndUse<true>,
  SchemaPriorConfiguration<DeepPartial<CommonPropertiesToSaveAndUse<true>>> {
  // parsed internally
  casing: GeneratedNameCases
  injectedCasing?: { microservice?: GeneratedMicroserviceCasing }
  microserviceCasing?: Record<string, GeneratedMicroserviceCasing>
  constants: typeof SchematicConstants
  // some additional properties that does not to be saved
  packageJsonScripts: Record<string, string>
  // injecting enums since i want to compare this in jinja templates
  enum: Omit<CommonPropertiesToSaveAndUse<false>, 'microserviceClient' | 'effectiveComponents' | 'packageJsonScripts'>
}

interface CommonPropertiesToSaveAndUse<Values extends boolean = false> extends SchemaExtensions<AvailableExtensions, typeof AvailableExtensions, Values> {
  components: Values extends true ? AvailableComponents[] : typeof AvailableComponents
  effectiveComponents: number
  server: Values extends true ? AvailableServerTypes : typeof AvailableServerTypes
  serverAdapter: Values extends true ? AvailableServerAdapters : typeof AvailableServerAdapters
  microservice: Values extends true ? AvailableMicroserviceTypes : typeof AvailableMicroserviceTypes
  microserviceClient: string[]
  database: Values extends true ? AvailableDBTypes : typeof AvailableDBTypes
  dbAdapters: Values extends true ? AvailableDBAdapters : typeof AvailableDBAdapters
  tests: Values extends true ? AvailableTestsTypes : typeof AvailableTestsTypes
}
