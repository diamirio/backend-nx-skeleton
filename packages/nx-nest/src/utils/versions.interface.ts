import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableMicroserviceTypes, AvailableServerTypes } from '@interfaces/available.constants'
import { AvailableTestsTypes, VersionsMap } from '@webundsoehne/nx-tools'

export type Versions = VersionsMap<
Exclude<AvailableComponents, AvailableComponents.SERVER> | AvailableServerTypes | AvailableDBTypes | AvailableDBAdapters | AvailableTestsTypes | AvailableMicroserviceTypes,
'default' | 'microservice' | 'builder'
>
