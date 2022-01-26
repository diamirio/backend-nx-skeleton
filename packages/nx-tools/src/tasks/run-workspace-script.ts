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
  const cwd = process.cwd()

  process.chdir(options.root)
  logger.debug(`Process current working directory has been changed: ${options.root}`)

  const id = addExternalSchematicTask<PackageCommandSchema>(context, '@webundsoehne/nx-tools', 'package-script', options, dependencies)

  logger.debug(`Process current working directory has been reverted: ${cwd}`)
  process.chdir(cwd)

  return id
}

export function addRunWorkspaceScriptTaskRule (options: PackageCommandSchema, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addRunWorkspaceScriptTask(context, options, dependencies)
  }
}
