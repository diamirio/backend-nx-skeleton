import { chain, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'

import { InitiateBuilderDependenciesOptions } from './initiate-builder.interface'
import { calculateDependencies } from '@utils/versions'

export function initiateBuilderDependencies (options: InitiateBuilderDependenciesOptions): Rule {
  const dependencies = calculateDependencies(options)

  return chain([ addDepsToPackageJson(dependencies.prod, dependencies.dev) ])
}
