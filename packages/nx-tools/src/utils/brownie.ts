import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

import { BrownieInterface } from './brownie.interface'

export function updateBrownieIntegration (options: BrownieInterface): Rule {
  return updateJsonInTree('.brownie-nx.json', (json: BrownieInterface) => {
    json.containers = options.containers.filter((v, i, a) => a.indexOf(v) === i)
    return json
  })
}