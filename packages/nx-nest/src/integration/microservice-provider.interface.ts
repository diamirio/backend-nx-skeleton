import type { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'

export interface MicroserviceProviderWorkspaceIntegration {
  name: string
  root: string
  sourceRoot: string
  microservice: ApplicationNormalizedSchema['microservice']
}
