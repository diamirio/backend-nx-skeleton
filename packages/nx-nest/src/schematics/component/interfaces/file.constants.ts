import { NormalizedSchema } from './../main.interface'
import { AvailableComponents, AvailableServerTypes } from '@interfaces/available.constants'

export const ComponentLocationsMap: Record<NormalizedSchema['type'], string> = {
  [AvailableServerTypes.RESTFUL]: 'server/modules',
  [AvailableServerTypes.GRAPHQL]: 'server/resolvers',
  [AvailableComponents.BG_TASK]: 'task/modules',
  [AvailableComponents.COMMAND]: 'command/modules',
  [AvailableComponents.MICROSERVICE_SERVER]: 'microservice/modules'
}
