import { NxNestProjectIntegration } from '@integration'
import { SchematicConstants } from '@interfaces'
import { AvailableComponents, AvailableServerTypes } from '@interfaces/available.constants'
import { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'
import { GeneratedMicroserviceCasing } from '@utils/generate-microservice-casing.interface'
import { BaseNormalizedSchemaWithParent, BaseSchemaWithParent, GeneratedNameCases } from '@webundsoehne/nx-tools'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema extends BaseSchemaWithParent<NxNestProjectIntegration> {
  type: AvailableComponentsSelection
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema extends Schema, BaseNormalizedSchemaWithParent<ApplicationNormalizedSchema['priorConfiguration']> {
  casing: GeneratedNameCases & {
    injected: {
      microservices: GeneratedMicroserviceCasing
    }
  }
  constants: typeof SchematicConstants
}

/**
 * Some components are currently disabled to generate components from at the moment.
 */
export type AvailableComponentsSelection = Exclude<AvailableComponents, AvailableComponents.SERVER | AvailableComponents.MICROSERVICE_CLIENT> | AvailableServerTypes
