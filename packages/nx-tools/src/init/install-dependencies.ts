import { Rule } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import { findWorkspaceRoot } from '@nrwl/cli/lib/find-workspace-root'
import execa from 'execa'
import { Listr } from 'listr2'
import through from 'through'

/**
 * @deprecated Template should not use the yarn workspaces anymore.
 *
 * Installs yarn workspace dependencies.
 */
export function installWorkspaceDependencies (options?: { root?: string }): Rule {
  return async (): Promise<void> => {
    await new Listr<void>([
      {
        title: 'Installing dependencies.',
        task: async (ctx, task): Promise<void> => {
          try {
            const instance = execa('yarn', {
              cwd: options?.root ?? findWorkspaceRoot(process.cwd()).dir,
              shell: true,
              stdio: 'pipe'
            })

            const pipeThrough = through((chunk: string) => {
              task.output = chunk
            })

            instance.stdout.pipe(pipeThrough)
            instance.stderr.pipe(pipeThrough)

            await instance

            task.title = 'Installed dependencies.'
          } catch (e) {
            if (e.errno === -2) {
              throw new Error('Yarn is not installed. Yarn is required to make the workspaces work.')
            } else {
              throw new Error(`Something went wrong while installing dependencies.\n${e}`)
            }
          }
        }
      }
    ]).run()
  }
}

/**
 * Add a install task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.
 * @param options
 */
export function addInstallTask (options?: { skipInstall?: boolean, root?: string }): Rule {
  return (_, context): void => {
    if (!options.skipInstall) {
      context.addTask(new NodePackageInstallTask(options?.root))
    }
  }
}
