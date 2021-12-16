import { AvailableDBAdapters } from '@interfaces/available.constants'

export interface BackendInterfacesIntegrationInterface {
  name: string
  root: string
  sourceRoot: string
  dbAdapter: AvailableDBAdapters
}
