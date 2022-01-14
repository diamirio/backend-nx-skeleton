import { chain, Rule } from '@angular-devkit/schematics'
import { Tree } from '@nrwl/devkit'

import { NormalizedSchema } from '../main.interface'
import { NxNestProjectIntegration } from '@src/integration'
import { BrownieAvailableContainers, updateBrownieIntegration, updateNxIntegration } from '@webundsoehne/nx-tools'

export function updateIntegration (host: Tree, options: NormalizedSchema): Rule {
  return chain([
    // add the components that needs to be known
    updateNxIntegration<NxNestProjectIntegration>(host, options.name, {
      microserviceProvider: { microservice: options.microservices }
    }),

    // add nx message queue container
    updateBrownieIntegration(host, options.name, { containers: [ BrownieAvailableContainers.NX ] })
  ])
}
