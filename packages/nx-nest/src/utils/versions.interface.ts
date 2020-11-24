import { PackageVersions } from '@webundsoehne/nx-tools'

import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableMicroserviceTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'

export type Versions = Partial<
Record<
Exclude<AvailableComponents, AvailableComponents.SERVER> | AvailableServerTypes | AvailableDBTypes | AvailableDBAdapters | AvailableTestsTypes | AvailableMicroserviceTypes,
PackageVersions
>
> &
Record<'builder', PackageVersions> &
Record<'base', Record<'default' | 'microservice', PackageVersions>>
