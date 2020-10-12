import { Rule } from '@angular-devkit/schematics'
import { readNxJson, updateJsonInTree } from '@nrwl/workspace'

import { BrownieIntegrationInterface } from './brownie.interface'
import { EnrichedNxJson } from '@interfaces/nx-json.interface'
import { deepMergeWithUniqueMergeArray } from '@utils/index'

/**
 * Updates brownie integration by wiriting data to nx.json
 * @param name
 * @param options
 */
export function updateBrownieIntegration (name: string, options: BrownieIntegrationInterface): Rule {
  return updateJsonInTree('nx.json', (json) => {
    // write it back
    json.projects[name].brownie = deepMergeWithUniqueMergeArray(json.projects[name]?.brownie ?? {}, options)

    return json
  })
}

/**
 * Returns the brownie integration part of the nx.json.
 * @param name
 */
export function readBrownieIntegration (name: string): BrownieIntegrationInterface {
  return (readNxJson() as EnrichedNxJson).projects?.[name]?.brownie
}
