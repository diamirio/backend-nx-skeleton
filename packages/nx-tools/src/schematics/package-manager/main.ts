import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import { normalizeOptions } from './lib/normalize-options'
import { runCommand } from './lib/run-command'
import type { Schema } from './main.interface'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([ runCommand(options) ])
  }
}
