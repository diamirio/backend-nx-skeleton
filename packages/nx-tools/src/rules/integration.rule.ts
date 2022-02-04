import type { Rule, Tree } from '@angular-devkit/schematics'

import { createWorkspaceProject, updateNxIntegration } from '@integration/integration'
import type { BaseIntegration } from '@integration/integration.interface'
import type { EnrichedProjectConfiguration } from '@interfaces/nx-json.interface'

/**
 * Creates a new project in the workspace.
 */
export function createWorkspaceProjectRule<T extends Record<PropertyKey, any> = BaseIntegration> (name: string, configuration: EnrichedProjectConfiguration<T>): Rule {
  return (host: Tree): Tree => {
    createWorkspaceProject(host, name, configuration)

    return host
  }
}

export function updateNxIntegrationRule<T extends Record<PropertyKey, any> = BaseIntegration> (name: string, integration: T, options?: { arrayOverwrite?: boolean }): Rule {
  return (host: Tree): Tree => {
    updateNxIntegration(host, name, integration, options)

    return host
  }
}
