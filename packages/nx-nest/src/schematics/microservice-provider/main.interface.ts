import { AvailableLinterTypes, AvailableMicroserviceTypes } from '@interfaces/available.constants'
import { SchematicConstants } from '@src/interfaces'
import { GeneratedMicroserviceCasing } from '@utils/generate-microservice-casing.interface'

/**
 * The options that it gets from angular-cli
 */
export interface Schema extends CommonPropertiesToSaveAndUse {
  name?: string
  linter?: AvailableLinterTypes
  skipFormat?: boolean
  silent?: boolean
  microservice?: AvailableMicroserviceTypes
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
}

/**
 * The templating bones of a single microservice.
 */
export type ParsedMicroservice = GeneratedMicroserviceCasing

/**
 * This properties are shared across the input, normalized and saved configurations.
 */
export interface CommonPropertiesToSaveAndUse {
  microservices?: ParsedMicroservice[]
}
