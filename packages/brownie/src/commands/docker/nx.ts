import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import { readBrownieContainers } from '@webundsoehne/nx-tools'
import { Listr } from 'listr2'

import { DockerContainerCommand } from './containers'
import { DockerNxCtx } from '@context/docker/nx'
import { DockerHelper } from '@helpers/docker.helper'

export class DockerNxCommand extends BaseCommand {
  static description = 'Generate docker-compose configuration depending on the current NX configuration.'

  static flags = {
    ...DockerContainerCommand.flags,
    'nx-json': flags.string({
      char: 'c',
      description: 'Config file to use.',
      default: 'nx.json'
    })
  }

  private helpers: { docker: DockerHelper }

  public async construct (): Promise<void> {
    const { flags } = this.parse(DockerContainerCommand)
    this.helpers = {
      docker: new DockerHelper(this, {
        flags: {
          force: flags.force,
          output: flags.output,
          volume: flags.volume,
          'volumes-folder': flags['volumes-folder']
        }
      })
    }
  }

  // TODO: maybe hold the run smaller, which just calls subfunctions ... no have to
  public async run (): Promise<void> {
    // get oclif parameters
    this.tasks.add<DockerNxCtx>([
      {
        task: (): Listr => this.helpers.docker.generateGetContainerTasks()
      },

      {
        title: 'Reading integration...',
        task: (ctx, task): void => {
          ctx.prompt = readBrownieContainers()

          task.title = `Found containers: ${ctx.prompt.join(', ')}`
        }
      },

      {
        task: (ctx): Listr => this.helpers.docker.generateDockerTasks(ctx.prompt)
      }
    ])
  }
}
