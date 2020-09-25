import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'
import merge from 'deepmerge'

import { MicroserviceIntegrationInterface } from './microservice-provider.interface'

export function updateBrownieIntegration (name: string, options: MicroserviceIntegrationInterface): Rule {
  return updateJsonInTree('nx.json', (json) => {
    // write it back
    json.projects[name].microservices = merge(json.projects[name]?.microservices ?? {}, options, {
      arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
    })

    return json
  })
}
