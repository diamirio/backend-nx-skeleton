import { chain, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'
import { calculateDependencies } from '@utils/versions'

import { InitiateBuilderDependenciesOptions } from './initiate-builder.interface'

export function initiateBuilderDependencies (options: InitiateBuilderDependenciesOptions): Rule {
  const dependencies = calculateDependencies(options)

  return chain([ addDepsToPackageJson(dependencies.prod, dependencies.dev) ])
}
