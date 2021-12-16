import { Rule } from '@angular-devkit/schematics'
import { readWorkspaceJson as baseReadWorkspaceJson, updateWorkspaceInTree } from '@nrwl/workspace'

import { BaseIntegration } from './integration.interface'
import { EnrichedWorkspaceJson } from '@interfaces/nx-json.interface'
import { deepMergeWithArrayOverwrite, deepMergeWithUniqueMergeArray } from '@utils'

/**
 * Updates nx integration by saving values like prior configuration or so for having a memory.
 */
export function updateNxIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (name: string, data: T, options?: { arrayOverwrite?: boolean }): Rule {
  return updateWorkspaceInTree<EnrichedWorkspaceJson<T>, EnrichedWorkspaceJson<T>>((json) => {
    // create a new configuration if does not exists
    if (!json?.projects?.[name]?.integration) {
      json.projects[name].integration = {} as T
    }

    const integration = json.projects[name].integration

    // write it back
    json.projects[name].integration = options?.arrayOverwrite ? deepMergeWithArrayOverwrite(integration, data) : deepMergeWithUniqueMergeArray(integration, data)

    return json
  })
}

/**
 * Returns the integration filed of nx.json.
 * @param name
 */
export function readNxIntegration<T extends Record<PropertyKey, any> = BaseIntegration> (name: string): EnrichedWorkspaceJson<T>['projects']['name']['integration'] {
  const workspace = baseReadWorkspaceJson() as EnrichedWorkspaceJson<T>

  return workspace.projects?.[name]?.integration
}

/**
 * Returns the workspace.json with extended typings.
 */
export function readWorkspaceJson<T extends Record<PropertyKey, any> = BaseIntegration> (): EnrichedWorkspaceJson<T> {
  const workspace = baseReadWorkspaceJson() as EnrichedWorkspaceJson<T>

  return workspace
}

/**
 * Returns the workspace.json configuration for a given application.
 * @param name
 */
export function readWorkspaceJsonProject<T extends Record<PropertyKey, any> = BaseIntegration> (name: string): EnrichedWorkspaceJson<T>['projects']['name'] {
  const workspace = baseReadWorkspaceJson() as EnrichedWorkspaceJson<T>

  return workspace.projects[name]
}
