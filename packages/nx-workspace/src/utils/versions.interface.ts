import { PackageVersions } from '@webundsoehne/nx-tools'

import { AvailableCLIs } from '@interfaces/available.constants'

export type Versions = Partial<Record<AvailableCLIs, PackageVersions>> & Record<'base', PackageVersions>
