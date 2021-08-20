import { Rule } from '@angular-devkit/schematics'
import { readNxJson, readWorkspaceJson as baseReadWorkspaceJson, updateJsonInTree } from '@nrwl/workspace'

import { EnrichedNxJson, EnrichedWorkspaceJson } from '@interfaces/nx-json.interface'
import { deepMergeWithArrayOverwrite, deepMergeWithUniqueMergeArray } from '@utils'

/**
 * Updates nx integration by saving values like prior configuration or so for having a memory.
 */
export function updateNxIntegration<T> (name: string, data: T, options?: { arrayOverwrite?: boolean }): Rule {
  return updateJsonInTree('nx.json', (json) => {
    let nxJson = {} as T

    // get the current config or create a new one
    if (!json?.projects?.[name]?.integration) {
      json.projects[name].integration = {} as T
    } else {
      nxJson = json.projects[name].integration
    }

    // write it back
    json.projects[name].integration = options?.arrayOverwrite ? deepMergeWithArrayOverwrite(nxJson, data) : deepMergeWithUniqueMergeArray(nxJson, data)

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
  return baseReadWorkspaceJson().projects[name] as EnrichedWorkspaceJson['projects']['name']
}
