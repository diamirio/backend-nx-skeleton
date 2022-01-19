import { Schema as ApplicationSchema } from '@schematics/application/main.interface'

export interface BackendInterfacesWorkspaceIntegration {
  name: string
  root: string
  sourceRoot: string
  dbAdapters: ApplicationSchema['dbAdapters']
}
