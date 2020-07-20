import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

import { BrownieInterface, BrownieIntegrationInterface } from './brownie.interface'

export function updateBrownieIntegration (options: BrownieIntegrationInterface): Rule {
  return updateJsonInTree('.brownie-nx.json', (json: BrownieInterface) => {
    if (!json?.[options.package]) {
      json[options.package] = {}
    }

    json[options.package].containers = [ ...json[options.package].containers ?? [], ...options.containers.filter((v, i, a) => a.indexOf(v) === i) ]
    return json
  })
}