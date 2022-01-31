import type { SchematicConstants } from '@interfaces'
import type { AvailableMicroserviceTypes } from '@interfaces/available.constants'
import type { GeneratedMicroserviceCasing } from '@utils/generate-microservice-casing.interface'
import type { BaseNormalizedSchema, BaseSchema, SchemaPriorConfiguration } from '@webundsoehne/nx-tools'

/**
 * The options that it gets from angular-cli
 */
export interface Schema extends BaseSchema, CommonPropertiesToSaveAndUse {
  microservice?: AvailableMicroserviceTypes
}

/**
 * After the options has been normalized.
 */
export interface NormalizedSchema extends Schema, BaseNormalizedSchema, SchemaPriorConfiguration<CommonPropertiesToSaveAndUse> {
  constants: typeof SchematicConstants
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
