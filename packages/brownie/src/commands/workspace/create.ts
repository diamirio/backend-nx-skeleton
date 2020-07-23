import { BaseCommand, mergeObjects, readFile, writeFile, promptUser } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import chalk from 'chalk'
import execa from 'execa'

import { WorkspaceRefreshCommand } from './refresh'
import { WorkspaceCreateCommandCtx } from '@context/workspace/create.interface'
import { GitCommandHelper } from '@helpers/git.helper'

export class WorkspaceCreateCommand extends BaseCommand {
  static description = 'Merge existing skeleton with the current repository.'

  static flags = {
    'package-json': flags.string({ description: 'Package json file to work with.', default: 'package.json' }),
    'nx-json': flags.string({ description: 'NX json file to work with.', default: 'nx.json' }),
    override: flags.boolean({ hidden: true, description: 'Override from another module.' })
  }

  // class initiations
  private readonly helpers = { git: new GitCommandHelper<WorkspaceCreateCommandCtx>(this) }

  async run (): Promise<void> {
    // get oclif parameters
    const { flags } = this.parse(WorkspaceCreateCommand)

    // initiate variables
    this.tasks.ctx = new WorkspaceCreateCommandCtx()

    // get config
    const { local, config } = await this.getConfig('workspace.config.yml')
    if (!local) {
      this.logger.warn('Using default module skeletons. Use `brownie config skeletons add/reset` to generate a local configuration that is editable.')
    }

    // check lock file and offer reset instead
    const lockFile = await this.locker.getLockFile()

    if (!flags.override && lockFile && lockFile[this.id]?.repo && lockFile[this.id]?.branch) {
      const warning = await promptUser({
        type: 'Toggle',
        message: chalk.yellow(
          'Prior configuration in lock file has been found. You can try `workspace:refresh` function to pull the changes in the last skeleton again.\n' +
            'Do you want to pull the configuration instead of merging a new skeleton?'
        ),
        initial: true
      })

      if (warning) {
        await WorkspaceRefreshCommand.run(this.argv)
        process.exit(127)
      }
    }

    // add configuration in on ctx
    this.tasks.options.ctx.skeletons = config

    this.tasks.add<WorkspaceCreateCommandCtx>([
      this.tasks.indent(
        [
          // ensure that git is installed
          this.helpers.git.ensureGitInstall(),

          // check if in the top level of the git directory
          this.helpers.git.checkGitRepositoryAtChdir(),

          // initating git repository
          {
            title: `Initiating new GIT repository at "${process.cwd()}".`,
            enabled: (ctx): boolean => ctx.gitInit,
            task: async (ctx, task): Promise<void> => {
              try {
                await execa('git', [ 'init' ])
                task.title = `Created a new GIT repository at "${process.cwd()}".`
              } catch {
                throw new Error('Something went wrong while creating a empty GIT repository.')
              }
            }
          }
        ],
        {},
        { title: 'Performing primary actions.' }
      ),

      // Get which skeletons to use.
      {
        enabled: (ctx): boolean => Object.keys(ctx?.skeletons).length > 0,
        task: async (ctx, task): Promise<string> =>
          ctx.prompts.repo = await task.prompt({
            type: 'Select',
            message: 'Which skeleton library you want to use?',
            choices: Object.keys(ctx.skeletons)
          })
      },

      // add skeleton to the current git configuration
      this.tasks.indent((ctx) => [
        // removing existing skeleton library
        this.helpers.git.removeRemoteOrigin('skeleton'),

        // Add new skeleton configuration
        this.helpers.git.addRemoteOrigin(ctx.skeletons[ctx.prompts?.repo], 'skeleton')
      ]),

      // fetch git repo
      this.tasks.indent(
        [
          // fetch remote repository
          this.helpers.git.fetchRemote('skeleton'),

          // get and parse branches
          {
            task: async (ctx): Promise<void> => {
              const repo = ctx.prompts.repo

              try {
                // run linux command
                const command = await execa.command('git branch -a')
                const parsedBranches = command.stdout

                // get remote branches and filter them to be the part of skeleton
                ctx.branches = parsedBranches
                  .split(' ')
                  .filter((branch) => {
                    const parsedBranch = branch.split('/')
                    return parsedBranch[0] === 'remotes' && parsedBranch[1] === 'skeleton'
                  })
                  // delete remote from the name since it is fetched now
                  .map((branch) => {
                    const parsedBranch = branch.split('/')
                    parsedBranch.shift()

                    return parsedBranch.join('/').trim()
                  })
              } catch (e) {
                throw new Error(`There was error while fetching available branches from "${repo}".\n${e.stderr}`)
              }
            }
          }
        ],
        {},
        { title: 'Fetching git repository and its branches.' }
      ),

      // prompt which branch to use
      {
        task: async (ctx, task): Promise<string> =>
          ctx.prompts.branch = await task.prompt({
            type: 'Select',
            message: 'Which branch of the skeleton you want to merge?',
            choices: ctx.branches
          })
      },

      // Merge remote branch to current branch
      this.tasks.indent((ctx) => this.helpers.git.mergeBranch(ctx.prompts.repo, ctx.prompts.branch), { exitOnError: false }, { title: 'Merging repository.' }),

      // File actions
      this.tasks.indent(
        [
          // Lock File
          {
            title: 'Adapting the lock file.',
            task: async (ctx, task): Promise<void> => {
              await this.locker.lockAll()
              task.title = 'Lock file adapted.'
            }
          },

          // give this project a scope
          {
            task: async (ctx, task): Promise<void> => {
              const nxJson = await readFile(flags['nx-json'])

              ctx.scope = await task.prompt<string>({
                type: 'Input',
                message: 'Please give this project a NPM scope.',
                validate: (value): boolean | string => {
                  if (!new RegExp(/^[a-z0-9-~][a-z0-9-._~]*$/).test(value)) {
                    // validate the name field according to schema of package.json
                    return 'Give it a valid string scope name without "@" and "/".'
                  } else {
                    return true
                  }
                }
              })

              // write changes
              await writeFile(flags['nx-json'], mergeObjects(nxJson, { npmScope: ctx.scope }))

              // update the package.json as well
              await writeFile(flags['package-json'], mergeObjects(await readFile(flags['package-json']), { name: `@${ctx.scope}/workspace` }))
            }
          },

          // Edit package json prompt
          {
            task: async (ctx, task): Promise<void> => {
              ctx.prompts.packageEdit = await task.prompt({ type: 'Toggle', message: `Do you want to initiate "${flags['package-json']}"?` })
            }
          },

          // prompt changes to package json
          {
            enabled: (ctx): boolean => ctx.prompts.packageEdit,
            task: async (ctx, task): Promise<void> => {
              const packageJson = await readFile(flags['package-json'])

              ctx.prompts.package = await task.prompt<Record<string, string>>({
                type: 'Form',
                message: `Fill out the fields in "${flags['package-json']}".`,
                choices: [
                  {
                    name: 'name',
                    message: 'name',
                    initial: packageJson?.name
                  },
                  {
                    name: 'version',
                    message: 'version',
                    initial: packageJson?.version
                  },
                  {
                    name: 'description',
                    message: 'description',
                    initial: packageJson?.description
                  },
                  {
                    name: 'author',
                    message: 'author',
                    initial: packageJson?.author
                  },
                  {
                    name: 'repository',
                    message: 'repository',
                    initial: packageJson?.repository
                  }
                ],
                validate: (value): boolean | string => {
                  if (!new RegExp(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/).test(value.name)) {
                    // validate the name field according to schema of package.json
                    return 'Not a valid package.json "name" field.'
                  } else if (!new RegExp(/^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/).test(value.version)) {
                    // validate the version field according to schema of package.json
                    return 'Not a valid package.json "version" field.'
                  } else {
                    return true
                  }
                }
              })

              // write changes
              await writeFile(flags['package-json'], mergeObjects(packageJson, ctx.prompts.package))
            }
          }
        ],
        {},
        { title: 'Making file changes.' }
      ),

      {
        title: 'Installing dependencies.',
        task: async (ctx, task): Promise<void> => {
          try {
            const pipetime = Date.now()
            await execa('yarn')

            task.title = `Installed dependencies in ${this.tasks.getRuntime(pipetime)}.`
          } catch (e) {
            if (e.errno === -2) {
              throw new Error('Yarn is not installed. Yarn is required to make the workspaces work.')
            } else {
              throw new Error(`Something went wrong while installing dependencies.\n${e}`)
            }
          }
        }
      }
    ])
  }
}
