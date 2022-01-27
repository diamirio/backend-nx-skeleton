import { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'

import { AvailablePackageManagers } from '@utils/package-manager/package-manager.constants'

interface TaskOptions {
  packageManager?: AvailablePackageManagers
  skipInstall?: boolean
  root?: string
}
/**
 * Add a install task to context to install the dependencies, ripped of from nx but it has the functionality to chdir.
 * @param options
 */
export function addInstallTask (context: SchematicContext, options?: TaskOptions, dependencies?: TaskId[]): TaskId {
  if (!options.skipInstall) {
    return context.addTask(
      new NodePackageInstallTask({
        workingDirectory: options.root,
        hideOutput: true,
        packageManager: options.packageManager
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
