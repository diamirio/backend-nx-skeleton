import {
  AvailableComponents,
  AvailableDBTypes,
  AvailableServerTypes,
  AvailableTestsTypes,
  AvailableLinterTypes,
  AvailableMicroserviceTypes
} from '@interfaces/available-options.interface'

/**
 * This is the unparsed options list coming from angular-schematics
 */
export interface Schema extends CommonPropertiesToSaveAndUse<true> {
  name: string
  // options for schematic
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
  root: string
  sourceRoot: string
  // prior configuration will be written to nx.json for further processing
  priorConfiguration: CommonPropertiesToSaveAndUse<true>
  // injecting enums since i want to compare this in jinja templates
  enum: CommonPropertiesToSaveAndUse<false>
}

interface CommonPropertiesToSaveAndUse<Values extends boolean = false> {
  components: Values extends true ? AvailableComponents[] : typeof AvailableComponents
  server: Values extends true ? AvailableServerTypes : typeof AvailableServerTypes
  microservice: Values extends true ? AvailableMicroserviceTypes : typeof AvailableMicroserviceTypes
  database: Values extends true ? AvailableDBTypes : typeof AvailableDBTypes
  tests: Values extends true ? AvailableTestsTypes : typeof AvailableTestsTypes
}
