import { AvailableBuilders } from '@interfaces/available.constants'
import { VersionsMap } from '@webundsoehne/nx-tools'

export type Versions = VersionsMap<Partial<AvailableBuilders>, never>
