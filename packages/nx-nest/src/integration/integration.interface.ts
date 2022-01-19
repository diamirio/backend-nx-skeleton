import { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'
import { NormalizedSchema as BackendInterfacesNormalizedSchema } from '@schematics/backend-interfaces/main.interface'
import { NormalizedSchema as MicroserviceProviderNormalizedSchema } from '@schematics/microservice-provider/main.interface'
import { BaseIntegration } from '@webundsoehne/nx-tools'

export type NxNestProjectIntegration = BaseIntegration<{
  nestjs: ApplicationNormalizedSchema['priorConfiguration']
  backendInterfaces: BackendInterfacesNormalizedSchema['priorConfiguration']
  microserviceProvider: MicroserviceProviderNormalizedSchema['priorConfiguration']
}>
