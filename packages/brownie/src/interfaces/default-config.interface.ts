import { BaseConfig } from '@cenk1cenk2/boilerplate-oclif'

export interface Configuration extends BaseConfig {
  workspace: {
    requiredDependencies: string[]
  }

  npm_registry?: string
}
