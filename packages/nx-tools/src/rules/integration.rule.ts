import { Rule } from '@angular-devkit/schematics'
import { addProjectConfiguration, Tree } from '@nrwl/devkit'

import { BaseIntegration } from '@integration/integration.interface'
import { EnrichedProjectConfiguration } from '@interfaces/nx-json.interface'

/**
 * Creates a new project in the workspace.
 */
export function createWorkspaceProject<T extends Record<PropertyKey, any> = BaseIntegration> (host: Tree, name: string, configuration: EnrichedProjectConfiguration<T>): Rule {
  return (): void => addProjectConfiguration(host, name, configuration, true)
}
