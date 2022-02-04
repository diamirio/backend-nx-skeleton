import type { CommonNodeDependency } from '@webundsoehne/nx-tools'

export interface WorkspaceConfig extends CommonNodeDependency {
  collection: string
}
