import { Path } from '@angular-devkit/core'
import { NxJson, NxJsonProjectConfig } from '@nrwl/workspace/src/core/shared-interfaces'

import { BrownieIntegrationInterface } from '@integration/brownie.interface'

export interface EnrichedNxJson<T extends any = any> extends NxJson {
  projects: {
    [name: string]: NxJsonProjectConfig & {
      integration: T
      brownie: BrownieIntegrationInterface
    }
  }
}

export interface EnrichedWorkspaceJson {
  version: number
  projects: {
    [name: string]: EnrichedWorkspaceJsonProject
  }
  cli: any
  schematics: any
}

export interface EnrichedWorkspaceJsonProject {
  root: Path
  sourceRoot: Path
  projectType?: 'library' | 'application'
  schematics?: any
  architecht?: any
}
