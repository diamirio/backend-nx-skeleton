import type { NxJsonConfiguration, ProjectConfiguration, WorkspaceConfiguration } from '@nrwl/devkit'

import type { BaseIntegration, BaseNxJsonIntegration } from '@integration/integration.interface'

/**
 * Nx does not import a type for workspace.json. This fills that gap.
 */
export interface EnrichedWorkspaceConfiguration<T extends Record<string, any> = BaseIntegration> extends WorkspaceConfiguration {
  projects: Record<string, string> | EnrichedProjectConfiguration<T>
}

/**
 * Per application settings in workspace.json
 */
export interface EnrichedProjectConfiguration<T extends Record<string, any> = BaseIntegration> extends ProjectConfiguration {
  integration?: T
}

/**
 * nx.json interface expanded before, although nx has changed configuration now, that removes this need
 * we may need in future, so instead of importing NxJson from nx we can still use ours.
 */
export interface EnrichedNxConfiguration<T extends Record<string, any> = BaseNxJsonIntegration> extends NxJsonConfiguration {
  integration?: T
}
