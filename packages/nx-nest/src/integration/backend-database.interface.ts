import type { NormalizedSchema as ApplicationNormalizedSchema } from '@schematics/application/main.interface'
import type { ProjectIntegration } from '@webundsoehne/nx-tools'

export interface BackendDatabaseWorkspaceIntegration extends ProjectIntegration {
  dbAdapters: ApplicationNormalizedSchema['dbAdapters']
}
