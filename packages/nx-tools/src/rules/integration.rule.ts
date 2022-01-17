import { Rule, Tree } from '@angular-devkit/schematics'

import { BaseIntegration } from '@integration/integration.interface'
import { EnrichedProjectConfiguration } from '@interfaces/nx-json.interface'
import { createWorkspaceProject } from '@src/integration/integration'

/**
 * Creates a new project in the workspace.
 */
export function createWorkspaceProjectRule<T extends Record<PropertyKey, any> = BaseIntegration> (name: string, configuration: EnrichedProjectConfiguration<T>): Rule {
  return (host: Tree): Rule => {
    createWorkspaceProject(host, name, configuration)

    return
  }
}
