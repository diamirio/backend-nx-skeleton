import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import execa from 'execa'
import { ListrTask } from 'listr2'

import { WorkspaceCreateCommandCtx } from '@context/workspace/create.interface'
import { WorkspaceRefreshCommandCtx } from '@context/workspace/refresh.interface'

export class GitCommandHelper<Ctx extends WorkspaceCreateCommandCtx | WorkspaceRefreshCommandCtx> {
  constructor (private cmd: BaseCommand) {}

  public ensureGitInstall (): ListrTask<Ctx> {
    return {
      title: 'Being sure that GIT is installed.',
      task: async (ctx, task): Promise<void> => {
        try {
          const gitVersion = await execa('git', [ '--version' ])
          task.title = `Found git version: ${gitVersion.stdout}`
        } catch (e) {
          this.cmd.logger.debug(e)
          this.cmd.logger.fail('GIT not available on the sytem or can not reach it!. Quitting.')
          process.exit(10)
        }
      }
    }
  }

  public checkGitRepositoryAtChdir (): ListrTask<Ctx> {
    return {
      title: 'Checking git repository.',
      task: async (ctx, task): Promise<void> => {
        try {
          const gitDirectory = await execa('git', [ 'rev-parse', '--show-toplevel' ])

          // you can move to top directory if you are merging
          if (ctx instanceof WorkspaceCreateCommandCtx) {
            // if not at top directory
            if (gitDirectory.stdout !== process.cwd()) {
              const prompt = await task.prompt<boolean>({
                type: 'Toggle',
                message: `You might be in a subfolder. Do you want to change to the top level of GIT repository at "${gitDirectory.stdout}"?`
              })

              if (prompt) {
                // user want to go to the top directory
                process.chdir(gitDirectory.stdout)
                task.title = `Changed to GIT directory "${gitDirectory.stdout}".`
              } else {
                // user want to go to top repository
                throw new Error('not a git repository')
              }
            } else {
              task.title = 'Found a git repository at current folder.'
            }
          }
        } catch (e) {
          this.cmd.logger.debug(e)

          if (String(e.message).toLowerCase().match('not a git repository')) {
            if (ctx instanceof WorkspaceCreateCommandCtx) {
              // init a new git repo
              ctx.gitInit = true
              task.title = 'Will initiate a new git repository here.'
            } else if (ctx instanceof WorkspaceRefreshCommandCtx) {
              // just throw out an error
              throw new Error('Not a git repository.')
            }
          } else {
            throw new Error('Something went wrong while going to the top directory of the git repository.')
          }
        }
      }
    }
  }

  public addRemoteOrigin (origin: string, name: string): ListrTask<Ctx> {
    return {
      title: `Adding remote repository "${origin}".`,
      task: async (ctx, task): Promise<void> => {
        try {
          await execa('git', [ 'remote', 'add', name, origin ])
          task.title = `Added remote repository "${name}".`
        } catch (e) {
          this.cmd.logger.debug(e.stderr)
          throw new Error(`There was error while adding remote repository "${name}@${origin}".`)
        }
      }
    }
  }

  public removeRemoteOrigin (origin: string): ListrTask<Ctx> {
    return {
      task: async (ctx, task): Promise<void> => {
        try {
          await execa('git', [ 'remote', 'rm', origin ])
          task.title = `Removed remote named "${origin}".`
        } catch (e) {
          this.cmd.logger.debug(`There is already no remote repository called "${origin}".`)
        }
      }
    }
  }

  public fetchRemote (name: string): ListrTask<Ctx> {
    return {
      task: async (ctx): Promise<void> => {
        try {
          await execa('git', [ 'fetch', name ])

          if (ctx instanceof WorkspaceCreateCommandCtx) {
            // add to locker configuration
            this.cmd.locker.add([ { path: 'repo', data: ctx.skeletons[ctx.prompts.repo] } ])
          }
        } catch (e) {
          this.cmd.logger.debug(e.stderr)
          throw new Error(`There was error while fetching remote repository "${name}".`)
        }
      }
    }
  }

  public mergeBranch (repo: string, branch: string): ListrTask<Ctx>[] {
    return [
      // Merge remote branch to current branch
      {
        title: 'Merging remote branch to current local branch.',
        task: async (ctx, task): Promise<void> => {
          try {
            const gitMerge = await execa('git', [ 'merge', branch ])

            task.title = `Merged remote branch "${branch}" to current local branch.`

            if (gitMerge.stdout !== '') {
              task.output = `Merge status:\n${gitMerge.stdout}`
            }

            if (ctx instanceof WorkspaceCreateCommandCtx) {
              this.cmd.locker.add([ { path: 'branch', data: ctx.prompts.branch } ])
            }
          } catch (e) {
            this.cmd.logger.debug(e.stderr)
            throw new Error(`There was error while merging remote repository "${repo}".`)
          }
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // Show merge status
      {
        title: 'Showing your code base differences to current merge.',
        task: async (ctx, task): Promise<void> => {
          try {
            const diff = await execa('git', [ 'diff', '--summary', '--stat' ])

            if (diff.stdout !== '') {
              task.output = `Repository status:\n${diff.stdout}`
            }
          } catch (e) {
            this.cmd.logger.debug(e.stderr)
            throw new Error('There was error while showing status of the merge.')
          }
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      }
    ]
  }
}
