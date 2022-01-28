import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'
import { join } from 'path'

import { BaseNormalizedSchemaRoot } from '@interfaces/base-schemas.interface'
import { ImplicitDependencies } from '@interfaces/versions.interface'
import { deepMerge } from '@webundsoehne/deep-merge'

export function addPackageJsonImplicitDependenciesForProjectRule<T extends BaseNormalizedSchemaRoot> (options: T, deps: ImplicitDependencies): Rule {
  return updateJsonInTree(join(options.root, 'package.json'), (json) => {
    if (deps?.length > 0) {
      json.implicitDependencies = deepMerge(json.implicitDependencies ?? {}, Object.fromEntries(deps.map((dep) => [ dep, true ])))
    }

    return json
  })
}
