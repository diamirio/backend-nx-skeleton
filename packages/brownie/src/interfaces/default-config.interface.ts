import { BaseConfig } from '@cenk1cenk2/boilerplate-oclif'

import { NodeDependency } from './dependency.interface'

export interface Configuration extends BaseConfig {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  package_registry?: string
  workspace: {
    requiredDependencies: NodeDependency[]
  }
}
