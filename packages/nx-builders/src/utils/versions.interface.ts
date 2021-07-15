import { VersionsMap } from '@webundsoehne/nx-tools'

import { AvailableBuilders } from '@interfaces/available.constants'

export type Versions = VersionsMap<Partial<AvailableBuilders>, never>
