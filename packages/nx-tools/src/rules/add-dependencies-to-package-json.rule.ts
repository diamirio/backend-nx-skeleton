import type { Rule } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace/src/utils/ast-utils'

import { updatePackageJsonForProjectRule } from './update-package-json.rule'
import type { BaseNormalizedSchemaRoot } from '@interfaces/base-schemas.interface'
import type { PackageVersions } from '@interfaces/versions.interface'

export function addDependenciesToProjectPackageJsonRule<T extends BaseNormalizedSchemaRoot> (options: T, data: PackageVersions): Rule {
  return chain([ updatePackageJsonForProjectRule(options, { implicitDependencies: data.implicitDeps }), addDependenciesToPackageJsonRule(data) ])
}

export function addDependenciesToPackageJsonRule (data: PackageVersions): Rule {
  return addDepsToPackageJson(data.deps ?? {}, data.devDeps ?? {})
}
