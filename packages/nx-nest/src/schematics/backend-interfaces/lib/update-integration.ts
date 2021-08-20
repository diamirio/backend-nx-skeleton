import { chain, Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'
import { updateNxIntegration } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '../main.interface'

export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([
    // create nx json entry
    updateNxJsonInTree((json) => {
      json.projects[options.name] = { tags: [], implicitDependencies: [] }
      return json
    }),

    // add the components that needs to be known
    updateNxIntegration<NormalizedSchema['priorConfiguration']>(options.name, {
      dbAdapters: options.dbAdapters
    })
  ])
}