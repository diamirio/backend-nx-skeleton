import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { Schema as NxSchema } from '@nrwl/workspace/src/generators/remove/schema'

import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { formatTreeRule, removeTsConfigPathsRule } from '@webundsoehne/nx-tools'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([
      externalSchematic<NxSchema>('@nrwl/workspace', 'remove', {
        projectName: options.parent,
        skipFormat: options.skipFormat,
        forceRemove: options.force
      }),

      removeTsConfigPathsRule({ packageName: options.packageName }),

      formatTreeRule({ skip: options.skipFormat })
    ])
  }
}
