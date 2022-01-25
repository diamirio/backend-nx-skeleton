import { chain, Rule } from '@angular-devkit/schematics'

import { NormalizedSchema } from '../main.interface'
import { NxNestProjectIntegration } from '@integration'
import { BrownieAvailableContainers, updateBrownieIntegrationRule, updateNxIntegrationRule } from '@webundsoehne/nx-tools'

export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // add the components that needs to be known
    updateNxIntegrationRule<NxNestProjectIntegration>(options.name, {
      microserviceProvider: { microservices: options.microservices }
    }),

    // add nx message queue container
    updateBrownieIntegrationRule(options.name, { containers: [ BrownieAvailableContainers.NX ] })
  ])
}
