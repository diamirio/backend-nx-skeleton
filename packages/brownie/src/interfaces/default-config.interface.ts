import { BaseConfig } from '@cenk1cenk2/boilerplate-oclif'

import { NodeDependency } from './dependency.interface'
import { AvailablePackageManagers } from '@helpers/node.helper.interface'

export interface Configuration extends BaseConfig {
  package_manager: AvailablePackageManagers

  workspace: {
    requiredDependencies: NodeDependency[]
  }
}
