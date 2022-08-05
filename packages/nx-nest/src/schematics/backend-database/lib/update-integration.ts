import type { Rule } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import type { NormalizedSchema } from '../main.interface'
import type { NxNestProjectIntegration } from '@integration'
import { updateNxIntegrationRule } from '@webundsoehne/nx-tools'

export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // add the components that needs to be known
    updateNxIntegrationRule<NxNestProjectIntegration>(options.name, {
      backendDatabase: {
        dbAdapters: options.dbAdapters
      }
    })
  ])
}
