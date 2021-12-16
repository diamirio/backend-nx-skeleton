import { BaseIntegration } from '@webundsoehne/nx-tools'

import { BackendInterfacesIntegrationInterface } from './backend-interfaces.interface'

export type NxNestProjectIntegration = BaseIntegration<{
  interfaces: BackendInterfacesIntegrationInterface
}>
