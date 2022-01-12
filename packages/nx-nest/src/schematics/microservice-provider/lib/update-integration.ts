import { chain, Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'

import { NormalizedSchema } from '../main.interface'
import { BrownieAvailableContainers, updateBrownieIntegration, updateNxIntegration } from '@webundsoehne/nx-tools'

export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // create nx json entry
    updateNxJsonInTree((json) => {
      json.projects[options.name] = { tags: [], implicitDependencies: [] }
      return json
    }),

    // add the components that needs to be known
    updateNxIntegration<NormalizedSchema['priorConfiguration']>(options.name, {
      microservices: options.microservices
    }),

    // add nx message queue container
    updateBrownieIntegration(options.name, { containers: [ BrownieAvailableContainers.NX ] })
  ])
}
