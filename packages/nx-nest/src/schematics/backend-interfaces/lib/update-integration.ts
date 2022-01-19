import { chain, Rule } from '@angular-devkit/schematics'

import { NormalizedSchema } from '../main.interface'
import { NxNestProjectIntegration } from '@src/integration'
import { updateNxIntegrationRule } from '@webundsoehne/nx-tools'

export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // add the components that needs to be known
    updateNxIntegrationRule<NxNestProjectIntegration>(options.name, {
      backendInterfaces: {
        dbAdapters: options.dbAdapters
      }
    })
  ])
}
