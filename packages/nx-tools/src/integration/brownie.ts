import { Rule } from '@angular-devkit/schematics'
import { readNxJson, updateJsonInTree } from '@nrwl/workspace'
import merge from 'deepmerge'

import { BrownieIntegrationInterface } from './brownie.interface'
import { EnrichedNxJson } from '@interfaces/nx-json.interface'

export function updateBrownieIntegration (name: string, options: BrownieIntegrationInterface): Rule {
  return updateJsonInTree('nx.json', (json) => {
    // write it back
    json.projects[name].brownie = merge(json.projects[name]?.brownie ?? {}, options, {
      arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
    })

    return json
  })
}

export function readBrownieIntegration (name: string): BrownieIntegrationInterface {
  return (readNxJson() as EnrichedNxJson).projects?.[name]?.brownie
}
