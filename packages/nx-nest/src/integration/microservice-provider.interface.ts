import { GeneratedMicroserviceCasing } from '@src/utils/generate-microservice-casing.interface'

export interface MicroserviceProviderIntegration {
  name: string
  root: string
  sourceRoot: string
  microservice: GeneratedMicroserviceCasing[]
}
