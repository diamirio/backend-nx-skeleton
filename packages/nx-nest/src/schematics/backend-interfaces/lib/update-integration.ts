import { chain, Rule } from '@angular-devkit/schematics'

import { NormalizedSchema } from '../main.interface'
import { NxNestProjectIntegration } from '@src/integration'
import { createNxJsonEntry, updateNxIntegration } from '@webundsoehne/nx-tools'

export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // create nx json entry
    createNxJsonEntry(options.name),

    // add the components that needs to be known
    updateNxIntegration<NxNestProjectIntegration>(options.name, {
      backendInterfaces: {
        dbAdapters: options.dbAdapters
      }
    })
  ])
}
