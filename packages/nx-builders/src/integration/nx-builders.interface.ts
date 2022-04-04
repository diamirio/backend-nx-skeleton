import type { AvailableBuilders } from '@interfaces/available.constants'

export interface NxBuildersWorkspaceIntegration {
  nxBuilders: {
    available: AvailableBuilders[]
  }
}
