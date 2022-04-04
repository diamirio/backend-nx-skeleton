import type { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableMicroserviceTypes, AvailableServerTypes } from '@interfaces/available.constants'
import type { AvailableTestsTypes, VersionsMap } from '@webundsoehne/nx-tools'

export type Versions = VersionsMap<
Exclude<AvailableComponents, AvailableComponents.SERVER> | AvailableServerTypes | AvailableDBTypes | AvailableDBAdapters | AvailableTestsTypes | AvailableMicroserviceTypes,
'default' | 'microservice' | 'builder'
>
