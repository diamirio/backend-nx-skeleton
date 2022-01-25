import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { Schema as NrwlSchema } from '@nrwl/workspace/src/generators/move/schema'

import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { formatTreeRule, removeTsconfigPathsRule, updateTsConfigPathsRule } from '@webundsoehne/nx-tools'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const options = await normalizeOptions(host, context, schema)

    return chain([
      externalSchematic<NrwlSchema>('@nrwl/workspace', 'move', {
        destination: options.destination,
        projectName: options.parent,
        updateImportPath: options.updateImportPath,
        importPath: options.importPath,
        skipFormat: options.skipFormat
      }),

      removeTsconfigPathsRule({ packageName: options.parent }),

      updateTsConfigPathsRule({
        packageName: options.parent,
        root: options.project.root,
        sourceRoot: options.project.sourceRoot
      }),

      formatTreeRule({ skip: options.skipFormat })
    ])
  }
}
