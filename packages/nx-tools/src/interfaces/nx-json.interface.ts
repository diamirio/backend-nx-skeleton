import { NxProjectTypes } from '@constants/nx.constants'
import { NxJsonConfiguration, NxJsonProjectConfiguration } from '@nrwl/devkit'

import { BrownieIntegrationInterface } from '@integration/brownie.interface'

/**
 * Improved nx.json with integration stuff.
 */
export interface EnrichedNxJson<T extends any = any> extends NxJsonConfiguration {
  projects: {
    [name: string]: NxJsonProjectConfiguration & {
      integration: T
      brownie: BrownieIntegrationInterface
    }
  }
}

/**
 * Nx does not import a type for workspace.json. This fills that gap.
 */
export interface EnrichedWorkspaceJson {
  version: number
  projects: {
    [name: string]: EnrichedWorkspaceJsonProject
  }
  cli: any
  schematics: any
}

/**
 * Per application settings in workspace.json
 */
export interface EnrichedWorkspaceJsonProject {
  root: string
  sourceRoot: string
  projectType?: NxProjectTypes
  schematics?: any
  architect?: any
}
