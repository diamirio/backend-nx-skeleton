import type { Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'

import { deepMergeWithUniqueMergeArray } from '@webundsoehne/deep-merge'

export function addNxImplicitDependenciesRule (deps: Record<string, string[]>): Rule {
  return updateNxJsonInTree((json) => {
    json.implicitDependencies = deepMergeWithUniqueMergeArray(json.implicitDependencies ?? {}, deps)

    return json
  })
}
