import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import type { Schema } from './main.interface'
import { readNxBuildersWorkspaceIntegration } from '@integration/nx-builders'
import { initiateBuilderDependencies } from '@utils/initiate-builder'
import { Logger } from '@webundsoehne/nx-tools'

/**
 * Install builder dependencies
 * @param schema
 */
export default function (schema: Schema): Rule {
  return (host: Tree, context: SchematicContext): Rule => {
    const log = new Logger(context)
    const integration = readNxBuildersWorkspaceIntegration(host)

    if (integration?.nxBuilders?.available?.length > 0) {
      integration.nxBuilders.available.forEach((builder) => {
        const index = schema.items.indexOf(builder)

        if (index >= 0) {
          log.debug('Builder is already installed: %s', builder)

          schema.items.splice(index, 1)
        }
      })
    }

    return chain([initiateBuilderDependencies(schema.items)])
  }
}
