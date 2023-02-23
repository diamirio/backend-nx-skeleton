import type { Rule } from '@angular-devkit/schematics'
import { updateNxJsonInTree } from '@nrwl/workspace'

import { ArrayMergeBehavior, merge } from '@webundsoehne/deep-merge'

export function addNxImplicitDependenciesRule (deps: Record<string, string[]>): Rule {
  return updateNxJsonInTree((json) => {
    json.implicitDependencies = merge({ arrayMerge: ArrayMergeBehavior.UNIQUE }, json.implicitDependencies ?? {}, deps)

    return json
  })
}
