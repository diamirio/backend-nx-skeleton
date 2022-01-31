import type { NormalizedSchema as LibraryNormalizedSchema } from '@schematics/library/main.interface'
import type { BaseIntegration } from '@webundsoehne/nx-tools'

export type NxWorkspaceIntegration = BaseIntegration<{
  library: LibraryNormalizedSchema['priorConfiguration']
}>
