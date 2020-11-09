import { EnrichedWorkspaceJsonProject, GeneratedNameCases } from '@webundsoehne/nx-tools'

import { AvailableComponents, AvailableServerTypes } from '@interfaces/available.constants'
import { SchematicConstants } from '@src/interfaces'
import { NormalizedSchema as ApplicationNormalizedSchema } from '@src/schematics/application/main.interface'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema {
  name: string
  parent: string
  skipFormat: boolean
  type: Exclude<AvailableComponents, AvailableComponents.SERVER | AvailableComponents.MICROSERVICE_CLIENT> | AvailableServerTypes
  force: boolean
  silent: boolean
  mount?: string
  parentWsConfiguration: EnrichedWorkspaceJsonProject
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema extends Schema {
  root: string
  packageScope: string
  casing: GeneratedNameCases
  constants: typeof SchematicConstants
  parentPriorConfiguration: ApplicationNormalizedSchema['priorConfiguration']
}

/**
 * Some components are currently disabled to generate components from at the moment.
 */
export type AvailableComponentsSelection = Exclude<AvailableComponents, AvailableComponents.MICROSERVICE_CLIENT>
