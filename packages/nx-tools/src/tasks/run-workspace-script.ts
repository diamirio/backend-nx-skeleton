import { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'

import { addExternalSchematicTask } from './run-schematic-after'
import { Schema as PackageCommandSchema } from '@schematics/package-script/main.interface'
import { Logger } from '@utils/logger'

/**
 * Add a schematic task to run after the actions finish.
 * @param name
 * @param options
 */
export function addRunWorkspaceScriptTask (context: SchematicContext, options: PackageCommandSchema, dependencies?: TaskId[]): TaskId {
  const logger = new Logger(context)
  process.chdir(options.root)

  logger.debug(`Process current working directory has been changed: ${options.root}`)

  return addExternalSchematicTask<PackageCommandSchema>(context, '@webundsoehne/nx-tools', 'package-script', options, dependencies)
}

export function addRunWorkspaceScriptTaskRule (options: PackageCommandSchema, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addRunWorkspaceScriptTask(context, options, dependencies)
  }
}
