import type { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableServerTypes } from '@interfaces/available.constants'

export const ComponentLocationsMap: Record<NormalizedSchema['type'], string[]> = {
  [AvailableServerTypes.RESTFUL]: [ 'server/modules', 'server/module' ],
  [AvailableServerTypes.GRAPHQL]: [ 'server/resolvers', 'server/resolver' ],
  [AvailableComponents.BG_TASK]: [ 'task/modules', 'task/module' ],
  [AvailableComponents.COMMAND]: [ 'command/modules', 'command/module' ],
  [AvailableComponents.MICROSERVICE_SERVER]: [ 'microservice/modules', 'microservice/module' ]
}
