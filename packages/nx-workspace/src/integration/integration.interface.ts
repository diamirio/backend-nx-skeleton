import { NormalizedSchema as LibraryNormalizedSchema } from '@schematics/library/main.interface'
import { BaseIntegration } from '@webundsoehne/nx-tools'

export type NxWorkspaceIntegration = BaseIntegration<{
  library: LibraryNormalizedSchema['priorConfiguration']
}>
