import { BaseConfig } from '@cenk1cenk2/boilerplate-oclif'

import { NodeDependency } from './dependency.interface'

export interface Configuration extends BaseConfig {
  package_registry?: string
  workspace: {
    requiredDependencies: NodeDependency[]
  }
}
