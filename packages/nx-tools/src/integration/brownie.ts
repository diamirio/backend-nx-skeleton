import { Rule } from '@angular-devkit/schematics'
import { readNxJson, updateJsonInTree } from '@nrwl/workspace'

import { BrownieIntegrationInterface } from './brownie.interface'
import { EnrichedNxJson } from '@interfaces/nx-json.interface'
import { deepMergeWithUniqueMergeArray } from '@utils/index'

export function updateBrownieIntegration (name: string, options: BrownieIntegrationInterface): Rule {
  return updateJsonInTree('nx.json', (json) => {
    // write it back
    json.projects[name].brownie = deepMergeWithUniqueMergeArray(json.projects[name]?.brownie ?? {}, options)

    return json
  })
}

export function readBrownieIntegration (name: string): BrownieIntegrationInterface {
  return (readNxJson() as EnrichedNxJson).projects?.[name]?.brownie
}
