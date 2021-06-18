import { BaseConfig } from '@cenk1cenk2/boilerplate-oclif'

import { NodeDependency } from './dependency.interface'
import { AvailablePackageManagers } from '@src/helpers/node.helper.interface'

export interface Configuration extends BaseConfig {
  package_manager: AvailablePackageManagers

  // eslint-disable-next-line @typescript-eslint/naming-convention
  package_registry?: string

  workspace: {
    requiredDependencies: NodeDependency[]
  }
}
