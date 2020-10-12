import { Rule } from '@angular-devkit/schematics'
import { readNxJson, readWorkspaceJson as baseReadWorkspaceJson, updateJsonInTree } from '@nrwl/workspace'

import { EnrichedNxJson, EnrichedWorkspaceJson } from '@interfaces/nx-json.interface'
import { deepMergeWithUniqueMergeArray } from '@utils/index'

/**
 * Updates nx integration by saving values like prior configuration or so for having a memory.
 * @param name
 * @param options
 */
export function updateNxIntegration<T> (name: string, options: T): Rule {
  return updateJsonInTree('nx.json', (json) => {
    let nxJson = {} as T

    // get the current config or create a new one
    if (!json?.projects?.[name]?.integration) {
      json.projects[name].integration = {} as T
    } else {
      nxJson = json.projects[name].integration
    }

    // write it back
    json.projects[name].integration = deepMergeWithUniqueMergeArray(nxJson, options)

    return json
  })
}

/**
 * Returns the integration filed of nx.json.
 * @param name
 */
export function readNxIntegration<T> (name: string): T {
  return (readNxJson() as EnrichedNxJson<T>).projects?.[name]?.integration
}

/**
 * Returns the whole workspace.json for a given application.
 * @param name
 */
export function readWorkspaceJson (name: string): EnrichedWorkspaceJson['projects']['name'] {
  return baseReadWorkspaceJson().projects[name]
}
