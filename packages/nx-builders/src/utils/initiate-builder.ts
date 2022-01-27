import { chain, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson } from '@nrwl/workspace'

import { Schema } from '@schematics/init/main.interface'
import { calculateDependencies } from '@utils/versions'

/**
 * A function to initiate builder depdencies. It may be wiser to call it via schematic.
 * @param options
 */
export function initiateBuilderDependencies (options: Schema['items']): Rule {
  return async function (): Promise<Rule> {
    const dependencies = await calculateDependencies(options)

    return chain([ addDepsToPackageJson(dependencies.deps ?? {}, dependencies.devDeps ?? {}) ])
  }
}
