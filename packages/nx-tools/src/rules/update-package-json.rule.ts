import type { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'
import { join } from 'path'

import type { UpdatePackageJsonForProjectRuleOptions } from './update-package-json.rule.interface'
import type { BaseNormalizedSchemaRoot } from '@interfaces/base-schemas.interface'
import { deepMerge } from '@webundsoehne/deep-merge'

export function updatePackageJsonForProjectRule<T extends BaseNormalizedSchemaRoot> (options: T, data: UpdatePackageJsonForProjectRuleOptions): Rule {
  return updateJsonInTree(join(options.root, 'package.json'), (json) => {
    if (data.implicitDependencies?.length > 0) {
      json.implicitDependencies = Object.fromEntries(data.implicitDependencies.map((dep) => [ dep, true ]))
    }

    if (data.scripts && Object.keys(data.scripts).length > 0) {
      json.scripts = deepMerge(json.scripts, data.scripts)
    }

    return json
  })
}
