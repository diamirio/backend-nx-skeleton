import { EnrichedWorkspaceJsonProject } from '@webundsoehne/nx-tools'

import { AvailableComponents, AvailableServerTypes } from '@interfaces/available.constants'
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
  parentWsConfiguration: EnrichedWorkspaceJsonProject
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema {
  name: string
  root: string
  parent: string
  force: boolean
  silent: boolean
  type: Schema['type']
  casing: {
    pascal: string
    camel: string
  }
  parentWsConfiguration: Schema['parentWsConfiguration']
  parentPriorConfiguration: ApplicationNormalizedSchema['priorConfiguration']
}

/**
 * Some components are currently disabled to generate components from at the moment.
 */
export type AvailableComponentsSelection = Exclude<AvailableComponents, AvailableComponents.MICROSERVICE_CLIENT>
