import { chain, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'

import { Schema } from '@src/schematics/init/main.interface'
import { calculateDependencies } from '@utils/versions'

export function initiateBuilderDependencies (options: Schema['items']): Rule {
  const dependencies = calculateDependencies(options)

  return chain([ addDepsToPackageJson(dependencies.deps ?? {}, dependencies.devDeps ?? {}) ])
}
