import type { Rule } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import type { Schema } from './main.interface'
import { initiateBuilderDependencies } from '@utils/initiate-builder'

/**
 * Install builder dependencies
 * @param schema
 */
export default function (schema: Schema): Rule {
  return chain([ initiateBuilderDependencies(schema.items) ])
}
