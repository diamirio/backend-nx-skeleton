import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableMicroserviceTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'
import { VersionsMap } from '@webundsoehne/nx-tools'

export type Versions = VersionsMap<
Exclude<AvailableComponents, AvailableComponents.SERVER> | AvailableServerTypes | AvailableDBTypes | AvailableDBAdapters | AvailableTestsTypes | AvailableMicroserviceTypes,
'default' | 'microservice' | 'builder'
>
