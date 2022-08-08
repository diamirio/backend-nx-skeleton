import type {
  AvailableComponents,
  AvailableDBAdapters,
  AvailableDBTypes,
  AvailableMicroserviceTypes,
  AvailableServerAdapters,
  AvailableServerTypes
} from '@interfaces/available.constants'
import type { AvailableTestsTypes, VersionsMap } from '@webundsoehne/nx-tools'

export type Versions = VersionsMap<
| Exclude<AvailableComponents, AvailableComponents.SERVER>
| AvailableServerAdapters
| AvailableServerTypes
| `${AvailableServerAdapters}_${AvailableServerTypes.GRAPHQL}`
| AvailableDBTypes
| AvailableDBAdapters
| AvailableTestsTypes
| AvailableMicroserviceTypes,
'default' | 'microservice' | 'builder'
>
