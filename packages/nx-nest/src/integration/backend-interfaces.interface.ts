import { AvailableDBAdapters } from '@interfaces/available.constants'

export interface BackendInterfacesIntegration {
  name: string
  root: string
  sourceRoot: string
  dbAdapters: AvailableDBAdapters[]
}
