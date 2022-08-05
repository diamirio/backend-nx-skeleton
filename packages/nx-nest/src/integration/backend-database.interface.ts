import type { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'

export interface BackendDatabaseWorkspaceIntegration {
  name: string
  root: string
  sourceRoot: string
  dbAdapters: ApplicationNormalizedSchema['dbAdapters']
}
