import { NormalizedSchema } from './../main.interface'
import { AvailableComponents, AvailableServerTypes } from '@interfaces/available.constants'

export const ComponentLocationsMap: Record<NormalizedSchema['type'], string> = {
  [AvailableServerTypes.RESTFUL]: 'server',
  [AvailableServerTypes.GRAPHQL]: 'server',
  [AvailableComponents.BG_TASK]: 'task',
  [AvailableComponents.COMMAND]: 'command',
  [AvailableComponents.MICROSERVICE_SERVER]: 'microservice'
}
