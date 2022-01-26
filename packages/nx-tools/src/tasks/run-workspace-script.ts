import { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'

import { addExternalSchematicTask } from './run-schematic-after'
import { Schema as PackageCommandSchema } from '@schematics/package-script/main.interface'

/**
 * Add a schematic task to run after the actions finish.
 * @param name
 * @param options
 */
export function addRunWorkspaceScriptTask (context: SchematicContext, options: PackageCommandSchema, dependencies?: TaskId[]): TaskId {
  return addExternalSchematicTask<PackageCommandSchema>(context, '@webundsoehne/nx-tools', 'package-script', options, dependencies)
}

export function addRunWorkspaceScriptTaskRule (options: PackageCommandSchema, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addRunWorkspaceScriptTask(context, options, dependencies)
  }
}
