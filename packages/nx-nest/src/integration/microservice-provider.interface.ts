import { Schema as ApplicationSchema } from '@schematics/application/main.interface'

export interface MicroserviceProviderWorkspaceIntegration {
  name: string
  root: string
  sourceRoot: string
  microservice: ApplicationSchema['microservice']
}
