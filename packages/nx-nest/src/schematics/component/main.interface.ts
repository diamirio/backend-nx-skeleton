import type { NxNestProjectIntegration } from '@integration'
import type { SchematicConstants } from '@interfaces'
import type { AvailableComponents, AvailableServerTypes } from '@interfaces/available.constants'
import type { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'
import type { GeneratedMicroserviceCasing } from '@utils/generate-microservice-casing.interface'
import type { BaseNormalizedSchemaWithParent, BaseSchemaWithParentAndConfiguration, GeneratedNameCases } from '@webundsoehne/nx-tools'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema extends BaseSchemaWithParentAndConfiguration<NxNestProjectIntegration> {
  type: AvailableComponentsSelection
  mount?: string
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
