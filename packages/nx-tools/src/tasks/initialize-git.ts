import type { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'
import { RepositoryInitializerTask } from '@angular-devkit/schematics/tasks'

interface TaskOptions {
  skipGit?: boolean
  root?: string
  commit?: { name: string, email: string, message?: string }
}
/**
 * Add a git init task to context to install the dependencies, ripped of from nx but it has the functionality to chdir.
 * @param options
 */
export function addGitTask (context: SchematicContext, options?: TaskOptions, dependencies?: TaskId[]): TaskId {
  if (!options?.skipGit) {
    return context.addTask(new RepositoryInitializerTask(options?.root, options?.commit), dependencies)
  }
}

export function addGitTaskRule (options?: TaskOptions, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addGitTask(context, options, dependencies)
  }
}
