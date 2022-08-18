import type { BaseConfig } from '@cenk1cenk2/oclif-common'

import type { AvailablePackageManagers, NodeDependency } from '@webundsoehne/nx-tools'

export interface Configuration extends BaseConfig {
  package_manager: AvailablePackageManagers

  workspace: {
    requiredDependencies: NodeDependency[]
  }
}