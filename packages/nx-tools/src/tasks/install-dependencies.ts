import type { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'

import { RunPackageManagerTask } from './run-package-manager'
import { PackageManagerUsableCommands } from '@utils/package-manager/package-manager.constants'

interface TaskOptions {
  skip?: boolean
  root?: string
}

/**
 * Add a install task to context to install the dependencies, ripped of from nx but it has the functionality to chdir.
 * @param options
 */
export function addNxInstallTask (context: SchematicContext, options?: TaskOptions, dependencies?: TaskId[]): TaskId {
  if (!options?.skip) {
    return context.addTask(new NodePackageInstallTask(options?.root), dependencies)
  }
}

export function addNxInstallRule (options?: TaskOptions, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addNxInstallTask(context, options, dependencies)
  }
}

/**
 * Add a install task to context to install the dependencies, ripped of from nx but it has the functionality to chdir.
 * @param options
 */
export function addInstallTask (context: SchematicContext, options?: TaskOptions, dependencies?: TaskId[]): TaskId {
  if (!options?.skip) {
    return context.addTask(
      new RunPackageManagerTask({
        root: options?.root,
        action: { action: PackageManagerUsableCommands.INSTALL }
      }),
      dependencies
    )
  }
}

export function addInstallTaskRule (options?: TaskOptions, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addInstallTask(context, options, dependencies)
  }
}
