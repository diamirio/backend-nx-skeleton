import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { Schema as NxSchema } from '@nrwl/workspace/src/generators/remove/schema'

import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { formatTreeRule, removeTsconfigPathsRule } from '@webundsoehne/nx-tools'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([
      externalSchematic<NxSchema>('@nrwl/workspace', 'remove', {
        projectName: options.parent,
        skipFormat: options.skipFormat,
        forceRemove: options.force
      }),

      removeTsconfigPathsRule({ packageName: options.parent }),

      formatTreeRule({ skip: options.skipFormat })
    ])
  }
}
