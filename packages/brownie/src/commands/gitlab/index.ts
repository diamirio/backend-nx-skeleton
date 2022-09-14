import { Command } from '@cenk1cenk2/oclif-common'

export class GitlabCiCommand extends Command {
  static description = 'Create a gitlab ci configuration from known NX configuration.'

  static aliases = ['ci']

  async run (): Promise<void> {
    this.logger.warn('Gitlab-ci generation will go here.')
  }
}
