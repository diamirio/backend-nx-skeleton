import { Rule } from '@angular-devkit/schematics'
import { RepositoryInitializerTask } from '@angular-devkit/schematics/tasks'

/**
 * Add a git init task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.
 * @param options
 */
export function addGitTask (options?: { skipGit?: boolean, root?: string, commit?: { name: string, email: string, message?: string } }): Rule {
  return (_, context): void => {
    if (!options?.skipGit) {
      context.addTask(new RepositoryInitializerTask(options?.root, options?.commit))
    }
  }
}
