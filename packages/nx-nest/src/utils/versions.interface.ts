import { PackageVersions, LinterDependencies } from '@webundsoehne/nx-tools'

import { AvailableDBAdapters, AvailableMicroserviceTypes, AvailableTestsTypes, AvailableComponents, AvailableDBTypes, AvailableServerTypes } from '@interfaces/available.constants'

export type Versions = Partial<
Record<
Exclude<AvailableComponents, AvailableComponents.SERVER> | AvailableServerTypes | AvailableDBTypes | AvailableDBAdapters | AvailableTestsTypes | AvailableMicroserviceTypes,
PackageVersions
>
> &
Record<'builder', PackageVersions> &
Record<'base', Record<'default' | 'microservice', PackageVersions>> &
Record<'eslint', LinterDependencies>
