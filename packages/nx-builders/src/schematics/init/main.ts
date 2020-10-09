import { chain, Rule } from '@angular-devkit/schematics'

import { Schema } from './main.interface'
import { initiateBuilderDependencies } from '@src/utils/initiate-builder'

export default function (schema: Schema): Rule {
  return chain([ initiateBuilderDependencies(schema.items) ])
}
