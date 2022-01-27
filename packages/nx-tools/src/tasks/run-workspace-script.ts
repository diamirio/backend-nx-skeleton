import { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'

import { RunWorkspaceCommandTask, RunWorkspaceCommandTaskOptions } from './run-workspace-command'

/**
 * Add a schematic task to run after the actions finish.
 * @param name
 * @param options
 */
export function addRunWorkspaceScriptTask (context: SchematicContext, options: RunWorkspaceCommandTaskOptions, dependencies?: TaskId[]): TaskId {
  return context.addTask(new RunWorkspaceCommandTask(options), dependencies)
}

export function addRunWorkspaceScriptTaskRule (options: RunWorkspaceCommandTaskOptions, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addRunWorkspaceScriptTask(context, options, dependencies)
  }
}
