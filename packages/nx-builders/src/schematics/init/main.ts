import { chain, Rule } from '@angular-devkit/schematics'

import { Schema } from './main.interface'
import { initiateBuilderDependencies } from '@utils/initiate-builder'

/**
 * Install builder dependencies
 * @param schema
 */
export default function (schema: Schema): Rule {
  return chain([ initiateBuilderDependencies(schema.items) ])
}
