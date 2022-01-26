import { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'

interface TaskOptions {
  skipInstall?: boolean
  root?: string
}
/**
 * Add a install task to context to install the dependencies, ripped of from nx but it has the functionality to chdir.
 * @param options
 */
export function addInstallTask (context: SchematicContext, options?: TaskOptions, dependencies?: TaskId[]): TaskId {
  if (!options.skipInstall) {
    return context.addTask(new NodePackageInstallTask(options?.root), dependencies)
  }
}

export function addInstallTaskRule (options?: TaskOptions, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addInstallTask(context, options, dependencies)
  }
}
