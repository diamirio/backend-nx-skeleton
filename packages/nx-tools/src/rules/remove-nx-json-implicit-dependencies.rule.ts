import type { Rule } from '@angular-devkit/schematics'
import type { NxJsonConfiguration } from '@nrwl/devkit'
import { updateNxJsonInTree } from '@nrwl/workspace'

import type { BaseNormalizedSchemaRoot } from '@interfaces/base-schemas.interface'

export function removeNxJsonImplicitDependencies<T extends BaseNormalizedSchemaRoot> (options: T): Rule {
  return updateNxJsonInTree((json) => {
    json.implicitDependencies = Object.entries(json.implicitDependencies).reduce<NxJsonConfiguration['implicitDependencies']>((o, [key, value]) => {
      if (Array.isArray(value) && key && key.startsWith(options.root)) {
        return o
      }

      return { ...o, [key]: value }
    }, {})

    return json
  })
}
