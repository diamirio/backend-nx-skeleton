import { Rule } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'

/**
 * Add a install task to context to install the dependencies, ripped of from nx but it has the functionality to chdir.
 * @param options
 */
export function addInstallTask (options?: { skipInstall?: boolean, root?: string }): Rule {
  return (_, context): void => {
    if (!options.skipInstall) {
      context.addTask(new NodePackageInstallTask(options?.root))
    }
  }
}
