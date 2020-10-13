import { PackageVersions } from '@webundsoehne/nx-tools'

import { AvailableBuilders } from '@interfaces/index'

export type Versions = Partial<Record<AvailableBuilders, PackageVersions>> & Record<'base', Record<'default', PackageVersions>>
