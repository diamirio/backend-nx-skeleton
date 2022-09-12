import type { NodeDependency } from '@webundsoehne/nx-tools'

export interface Configuration {
  workspace: {
    requiredDependencies: NodeDependency[]
  }
}
