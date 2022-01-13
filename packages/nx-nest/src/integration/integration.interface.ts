import { BackendInterfacesIntegration } from './backend-interfaces.interface'
import { MicroserviceProviderIntegration } from './microservice-provider.interface'
import { NormalizedSchema } from '@schematics/application/main.interface'
import { BaseIntegration } from '@webundsoehne/nx-tools'

export type NxNestProjectIntegration = BaseIntegration<{
  nestjs: NormalizedSchema['priorConfiguration']
  backendInterfaces: BackendInterfacesIntegration
  microserviceProvider: MicroserviceProviderIntegration
}>
