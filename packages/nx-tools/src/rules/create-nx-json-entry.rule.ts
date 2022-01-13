import { Rule } from '@angular-devkit/schematics'
import { NxJsonProjectConfiguration } from '@nrwl/devkit'
import { updateNxJsonInTree } from '@nrwl/workspace'

/**
 * Creates a new nx.json project entry.
 *
 * @param {string} name
 * @param {NxJsonProjectConfiguration} data
 * @returns {}
 */
export function createNxJsonEntry (name: string, data?: NxJsonProjectConfiguration): Rule {
  return updateNxJsonInTree((json) => {
    json.projects[name] = {
      tags: [],
      implicitDependencies: [],
      ...data ?? {}
    }

    return json
  })
}
