import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'
import merge from 'deepmerge'

import { BrownieIntegrationInterface } from './brownie.interface'

export function updateBrownieIntegration (name: string, options: BrownieIntegrationInterface): Rule {
  return updateJsonInTree('nx.json', (json) => {
    let brownie = {} as BrownieIntegrationInterface

    // get the current config or create a new one
    if (!json?.projects?.[name]?.brownie) {
      json.projects[name].brownie = {} as BrownieIntegrationInterface
    } else {
      brownie = json.projects[name].brownie
    }

    // write it back
    json.projects[name].brownie = merge(brownie, options, {
      arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
    })

    return json
  })
}
