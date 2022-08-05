import type { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'
import type { NormalizedSchema as BackendDatabaseNormalizedSchema } from '@schematics/backend-database/main.interface'
import type { NormalizedSchema as BackendInterfacesNormalizedSchema } from '@schematics/backend-interfaces/main.interface'
import type { NormalizedSchema as MicroserviceProviderNormalizedSchema } from '@schematics/microservice-provider/main.interface'
import type { BaseIntegration } from '@webundsoehne/nx-tools'

export type NxNestProjectIntegration = BaseIntegration<{
  nestjs: ApplicationNormalizedSchema['priorConfiguration']
  backendInterfaces: BackendInterfacesNormalizedSchema['priorConfiguration']
  backendDatabase: BackendDatabaseNormalizedSchema['priorConfiguration']
  microserviceProvider: MicroserviceProviderNormalizedSchema['priorConfiguration']
}>
