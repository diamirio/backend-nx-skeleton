import type { Rule } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

import { updatePackageJsonForProjectRule } from './update-package-json.rule'
import type { BaseNormalizedSchemaRoot } from '@interfaces/base-schemas.interface'
import type { PackageVersions } from '@interfaces/versions.interface'
import { deepMerge } from '@webundsoehne/deep-merge'

export function addDependenciesToProjectPackageJsonRule<T extends BaseNormalizedSchemaRoot> (options: T, data: PackageVersions): Rule {
  return chain([updatePackageJsonForProjectRule(options, { implicitDependencies: data.implicitDeps }), addDependenciesToPackageJsonRule(data)])
}

export function addDependenciesToPackageJsonRule (data: PackageVersions): Rule {
  return updateJsonInTree('package.json', (json) => {
    if (!json.dependencies) {
      json.dependencies = {}
    }

    if (!json.devDependencies) {
      json.devDependencies = {}
    }

    json.dependencies = deepMerge(json.dependencies, data.deps ?? {})

    json.devDependencies = deepMerge(json.devDependencies, data.deps ?? {})

    return json
  })
}
