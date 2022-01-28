import { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'

import { RunPackageManagerTask, RunPackageManagerTaskOptions } from './run-package-manager'

/**
 * Add a schematic task to run after the actions finish.
 * @param name
 * @param options
 */
export function addRunWorkspaceScriptTask (context: SchematicContext, options: RunPackageManagerTaskOptions, dependencies?: TaskId[]): TaskId {
  return context.addTask(new RunPackageManagerTask(options), dependencies)
}

export function addRunWorkspaceScriptTaskRule (options: RunPackageManagerTaskOptions, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addRunWorkspaceScriptTask(context, options, dependencies)
  }
}
