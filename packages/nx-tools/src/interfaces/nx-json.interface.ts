import { NxProjectTypes } from '@constants/nx.constants'
import { NxJsonConfiguration } from '@nrwl/devkit'

import { BaseIntegration } from '@integration/integration.interface'

/**
 * Nx does not import a type for workspace.json. This fills that gap.
 */
export interface EnrichedWorkspaceJson<T extends Record<string, any> = BaseIntegration> {
  version: number
  projects: {
    [name: string]: EnrichedWorkspaceJsonProject<T>
  }
  cli: Record<string, any>
  schematics: Record<string, any>
}

/**
 * Per application settings in workspace.json
 */
export interface EnrichedWorkspaceJsonProject<T extends Record<string, any> = BaseIntegration> {
  root: string
  sourceRoot: string
  projectType?: NxProjectTypes
  schematics?: Record<string, any>
  architect?: Record<string, any>
  integration?: T
}

/**
 * nx.json interface expanded before, although nx has changed configuration now, that removes this need
 * we may need in future, so instead of importing NxJson from nx we can still use ours.
 */
export type EnrichedNxJson = NxJsonConfiguration
