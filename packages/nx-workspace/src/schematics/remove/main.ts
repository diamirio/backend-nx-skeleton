import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

import { normalizeOptions } from './lib/normalize-options'
import { NormalizedSchema, Schema } from './main.interface'
import { formatTreeRule, removeTsconfigPathsRule } from '@webundsoehne/nx-tools'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([
      externalSchematic<NormalizedSchema>('@nrwl/workspace', 'remove', options),

      removeTsconfigPathsRule({ packageName: options.projectName }),

      formatTreeRule({ skip: options.skipFormat })
    ])
  }
}
