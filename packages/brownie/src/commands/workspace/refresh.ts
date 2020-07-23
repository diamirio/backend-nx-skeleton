import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'

import { WorkspaceCreateCommand } from '@commands/workspace/create'
import { WorkspaceRefreshCommandCtx } from '@context/workspace/refresh.interface'
import { GitCommandHelper } from '@helpers/git.helper'

export class WorkspaceRefreshCommand extends BaseCommand {
  static description = 'Pull and merge the latest skeleton configuration.'

  static flags = {
    'package-json': flags.string({ description: 'Package json file to work with.', default: 'package.json' }),
    override: flags.boolean({ hidden: true, description: 'Override from another module.' })
  }

  // class initiations
  private readonly helpers = { git: new GitCommandHelper<WorkspaceRefreshCommandCtx>(this) }

  async run (): Promise<void> {
    // get oclif parameters

    // initiate variables
    this.tasks.ctx = new WorkspaceRefreshCommandCtx()

    // check if lock file exists
    const lockFile = await this.locker.getLockFile()

    // get config
    const { config } = await this.getConfig('workspace.config.yml')
    this.tasks.options.ctx.skeletons = config

    if (!lockFile || !lockFile[WorkspaceCreateCommand.id]?.repo || !lockFile[WorkspaceCreateCommand.id]?.branch) {
      this.logger.fail('There is no priorly applied skeleton configuration in the lock file.')
      process.exit(1)
    }

    this.tasks.add<WorkspaceRefreshCommandCtx>([
      this.tasks.indent(
        [
          // ensure that git is installed
          this.helpers.git.ensureGitInstall(),

          // check if in the top level of the git directory
          this.helpers.git.checkGitRepositoryAtChdir()
        ],
        {},
        { title: 'Performing primary actions.' }
      ),

      // add skeleton to the current git configuration
      this.tasks.indent([
        // removing existing skeleton library
        this.helpers.git.removeRemoteOrigin('skeleton'),

        // Add new skeleton configuration
        this.helpers.git.addRemoteOrigin(lockFile[WorkspaceCreateCommand.id]?.repo, 'skeleton')
      ]),

      // fetch git repo
      this.helpers.git.fetchRemote('skeleton'),

      // merge branch
      this.tasks.indent(this.helpers.git.mergeBranch(lockFile[WorkspaceCreateCommand.id]?.repo, lockFile[WorkspaceCreateCommand.id]?.branch), {}, { title: 'Merging repository.' })
    ])
  }
}
