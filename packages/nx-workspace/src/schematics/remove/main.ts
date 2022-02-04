import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain, externalSchematic } from '@angular-devkit/schematics'
import type { Schema as NxSchema } from '@nrwl/workspace/src/generators/remove/schema'

import { normalizeOptions } from './lib/normalize-options'
import { updateIntegration } from './lib/update-integration'
import type { Schema } from './main.interface'
import { formatTreeRule } from '@webundsoehne/nx-tools'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([
      externalSchematic<NxSchema>('@nrwl/workspace', 'remove', {
        projectName: options.parent,
        skipFormat: options.skipFormat,
        forceRemove: options.force
      }),

      updateIntegration(options),

      formatTreeRule({ skip: options.skipFormat })
    ])
  }
}
