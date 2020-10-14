import { Rule } from '@angular-devkit/schematics'
import { findWorkspaceRoot } from '@nrwl/cli/lib/find-workspace-root'
import execa from 'execa'
import { Listr } from 'listr2'

/**
 * @deprecated Template should not use the yarn workspaces anymore.
 *
 * Installs yarn workspace dependencies.
 */
export function installWorkspaceDependencies (): Rule {
  return async (): Promise<void> => {
    await new Listr<void>([
      {
        title: 'Installing dependencies.',
        task: async (ctx, task): Promise<void> => {
          try {
            const pipetime = Date.now()
            await execa('yarn', { cwd: findWorkspaceRoot(process.cwd()).dir })

            task.title = `Installed dependencies in ${Math.round(Date.now() - pipetime) / 1000}s.`
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
