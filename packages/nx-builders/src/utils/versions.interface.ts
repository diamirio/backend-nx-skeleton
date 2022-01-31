import type { AvailableBuilders } from '@interfaces/available.constants'
import type { VersionsMap } from '@webundsoehne/nx-tools'

export type Versions = VersionsMap<Partial<AvailableBuilders>, never>
