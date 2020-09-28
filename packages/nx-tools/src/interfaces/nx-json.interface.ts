import { NxJson, NxJsonProjectConfig } from '@nrwl/workspace/src/core/shared-interfaces'

import { BrownieIntegrationInterface } from '@integration/brownie.interface'

export interface EnrichedNxJson<T extends any = any> extends NxJson {
  projects: {
    [projectName: string]: NxJsonProjectConfig & {
      integration: T
      brownie: BrownieIntegrationInterface
    }
  }
}
