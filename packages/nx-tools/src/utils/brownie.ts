import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

import { BrownieIntegrationInterface } from './brownie.interface'

export function updateBrownieIntegration (options: BrownieIntegrationInterface): Rule {
  return updateJsonInTree('nx.json', (json) => {
    let brownie = {} as BrownieIntegrationInterface

    // get the current config or create a new one
    if (!json?.projects?.[options.name]?.brownie) {
      json.projects[options.name].brownie = {} as BrownieIntegrationInterface
    } else {
      brownie = json.projects[options.name].brownie
    }

    // for containers
    if (options.containers) {
      brownie.containers = [ ...brownie?.containers ?? [], ...options.containers ]
      // unique filter
      brownie.containers = arrayUniqueFilter(brownie.containers)
    }

    // write it back
    json.projects[options.name].brownie = brownie

    return json
  })
}

function arrayUniqueFilter <T extends any> (input: T[]): T[] {
  return input.filter((v, i, a) => a.indexOf(v) === i)
}