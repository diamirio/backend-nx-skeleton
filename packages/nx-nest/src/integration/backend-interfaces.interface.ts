import { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'

export interface BackendInterfacesWorkspaceIntegration {
  name: string
  root: string
  sourceRoot: string
  dbAdapters: ApplicationNormalizedSchema['dbAdapters']
}
