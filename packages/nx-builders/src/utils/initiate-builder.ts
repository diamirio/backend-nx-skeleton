import { chain, Rule } from '@angular-devkit/schematics'

import { Schema } from '@schematics/init/main.interface'
import { calculateDependencies } from '@utils/versions'
import { addDependenciesToPackageJson } from '@webundsoehne/nx-tools'

/**
 * A function to initiate builder depdencies. It may be wiser to call it via schematic.
 * @param options
 */
export function initiateBuilderDependencies (options: Schema['items']): Rule {
  return async function (): Promise<Rule> {
    const dependencies = await calculateDependencies(options)

    return chain([ addDependenciesToPackageJson(dependencies) ])
  }
}
