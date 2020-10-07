import { EnrichedWorkspaceJsonProject } from '@webundsoehne/nx-tools'

import { AvailableComponents, AvailableServerTypes, NormalizedSchema as ApplicationNormalizedSchema } from '@src/schematics/application/main.interface'

// this is the one gets inputted from the command line
export interface Schema {
  name: string
  parent: string
  skipFormat: boolean
  type: Exclude<AvailableComponents, 'server' | 'microservice-client'> | AvailableServerTypes
  force: boolean
  silent: boolean
  parentWsConfiguration: EnrichedWorkspaceJsonProject
}

export interface NormalizedSchema {
  name: string
  root: string
  parent: string
  force: boolean
  type: Schema['type']
  casing: {
    pascal: string
    camel: string
  }
  parentWsConfiguration: Schema['parentWsConfiguration']
  parentPriorConfiguration: ApplicationNormalizedSchema['priorConfiguration']
}

export type AvailableComponentsSelection = Exclude<AvailableComponents, 'microservice-client'>
