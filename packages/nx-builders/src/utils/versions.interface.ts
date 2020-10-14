import { PackageVersions } from '@webundsoehne/nx-tools'

import { AvailableBuilders } from '@interfaces/available.constants'

export type Versions = Partial<Record<AvailableBuilders, PackageVersions>> & Record<'base', Record<'default', PackageVersions>>
