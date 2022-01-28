import { chain, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace/src/utils/ast-utils'

import { updatePackageJsonForProjectRule } from './update-package-json.rule'
import { BaseNormalizedSchemaRoot } from '@interfaces/base-schemas.interface'
import { PackageVersions } from '@interfaces/versions.interface'

export function addDependenciesToProjectPackageJson<T extends BaseNormalizedSchemaRoot> (options: T, data: PackageVersions): Rule {
  return chain([ updatePackageJsonForProjectRule(options, { implicitDependencies: data.implicitDeps }), addDependenciesToPackageJson(data) ])
}

export function addDependenciesToPackageJson (data: PackageVersions): Rule {
  return addDepsToPackageJson(data.deps ?? {}, data.devDeps ?? {})
}
