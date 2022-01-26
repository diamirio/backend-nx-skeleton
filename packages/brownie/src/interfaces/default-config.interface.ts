import { BaseConfig } from '@cenk1cenk2/boilerplate-oclif'

import { AvailablePackageManagers, NodeDependency } from '@webundsoehne/nx-tools'

export interface Configuration extends BaseConfig {
  package_manager: AvailablePackageManagers

  workspace: {
    requiredDependencies: NodeDependency[]
  }
}
