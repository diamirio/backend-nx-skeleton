import { ConfigBaseCommand, ConfigCommandChoices, ConfigRemove, ConfigTypes, createTable } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import { BrownieAvailableContainers } from '@webundsoehne/nx-tools'
import * as fs from 'fs-extra'
import { Listr, ListrDefaultRenderer, ListrTask, ListrTaskWrapper } from 'listr2'
import { join } from 'path'

import { DockerContainerAddCtx, DockerContainersPurgeCtx } from '@context/docker/containers'
import { DockerHelper } from '@helpers/docker.helper'
import { DockerComposeFile } from '@helpers/docker.helper.interface'
import { DockerHelperLock, LockFile, LockPaths } from '@src/interfaces/lock-file.interface'

export class DockerContainerCommand extends ConfigBaseCommand {
  static flags = {
    force: flags.boolean({
      char: 'f',
      description: 'Force overwrites.'
    }),
    output: flags.string({
      char: 'o',
      description: 'Output folder for the Docker files.',
      default: '.docker'
    }),
    volume: flags.boolean({
      char: 'v',
      description: 'Use optional persistent volumes with the containers.'
    }),
    'volumes-folder': flags.string({
      char: 'V',
      description: 'Output to volumes folder.',
      default: 'volumes'
    })
  }

  static description = 'Create docker-compose configuration from boilerplates.'

  public choices: (ConfigCommandChoices | string)[] = [ ConfigCommandChoices.add, ConfigCommandChoices.show, ConfigCommandChoices.remove, 'Purge' ]

  protected configName = 'docker-compose.yml'
  protected configType = ConfigTypes.localRoot

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

  public async configAdd (config: DockerComposeFile): Promise<DockerComposeFile> {
    this.tasks.ctx = { config }
    this.tasks.add<DockerContainerAddCtx>([
      {
        task: (): Listr => this.helpers.docker.generateGetContainerTasks()
      },

      // get user prompts
      {
        task: async (ctx, task): Promise<BrownieAvailableContainers[]> =>
          ctx.prompt = await task.prompt<BrownieAvailableContainers[]>({
            type: 'AutoComplete',
            multiple: true,
            message: 'Please select which containers you want to add.',
            choices: Object.keys(ctx.containers),
            initial: this.getInitialFromPriorConfiguration(config, Object.keys(ctx.containers))
          })
      },

      {
        task: (ctx): Listr => this.helpers.docker.generateDockerTasks(ctx.prompt)
      }
    ])

    // run all the tasks
    const { ctx } = await this.finally<DockerContainerAddCtx>()

    return ctx.config
  }

  // have to add this it is abstract :/
  public async configEdit (): Promise<null> {
    return
  }

  public async configShow (config: DockerComposeFile): Promise<void> {
    if (config?.services ? Object.keys(config.services).length > 0 : false) {
      this.logger.info(
        createTable(
          [ 'Container', 'Image' ],
          Object.entries(config.services).map(([ service, val ]) => [ service, val.image ?? val.build ])
        )
      )
    } else {
      this.logger.warn('Configuration file is empty.')
    }

    this.logger.module('Configuration file is listed.')
  }

  public async configRemove (config: DockerComposeFile): Promise<ConfigRemove<DockerComposeFile>> {
    return {
      keys: config?.services ? Object.keys(config.services) : [],
      removeFunction: async (config, key): Promise<DockerComposeFile> => {
        await Promise.all(
          key.map(async (k) => {
            delete config.services[k]
          })
        )
        return config
      }
    }
  }

  public async purgeConfig (): Promise<void> {
    const { flags } = this.parse(DockerContainerCommand)
    const lock = await this.lockerLocal.getLockFile<LockFile>()
    const containers = lock[LockPaths.DOCKER_HELPER]

    if (!containers || Object.keys(containers).length === 0) {
      throw new Error('Nothing in lock file to purge.')
    }

    this.tasks.ctx = new DockerContainersPurgeCtx()

    this.tasks.add<DockerContainersPurgeCtx>([
      {
        task: async (ctx, task): Promise<void> => {
          ctx.prompt.containers = await task.prompt({
            type: 'MultiSelect',
            message: 'Which containers you want to apply this on?',
            choices: Object.keys(containers)
          })
          task.title = `Will apply on containers: ${ctx.prompt.containers.join(', ')}`
        }
      },

      {
        skip: (ctx): boolean => ctx.prompt.containers.length === 0,
        task: async (ctx, task): Promise<void> => {
          ctx.prompt.purge = await task.prompt({
            type: 'MultiSelect',
            message: 'Which data you want to purge?',
            choices: Object.values(DockerHelperLock)
          })

          task.title = `Will purge: ${ctx.prompt.purge.join(', ')}`
        }
      },

      {
        title: 'Processing containers...',
        skip: (ctx): boolean => ctx.prompt.purge.length === 0,
        task: (ctx, task): Listr => {
          const subtasks = ctx.prompt.containers.map((name): { name: string, tasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] } => {
            return {
              name,
              tasks: [
                {
                  title: 'Deleting volumes...',
                  skip: (ctx): boolean => !ctx.prompt.purge.includes(DockerHelperLock.VOLUMES) || !containers[name]?.volumes,
                  task: async (ctx, task): Promise<void> => {
                    const deleted = await this.deleteFolder(task, join(process.cwd(), containers[name].volumes))

                    if (deleted) {
                      // unlock volumes from lock file
                      this.lockerLocal.addUnlock({
                        path: `${name}.${DockerHelperLock.VOLUMES}`
                      })
                    }
                  }
                },

                {
                  title: 'Deleting configuration...',
                  skip: (ctx): boolean => !ctx.prompt.purge.includes(DockerHelperLock.DIRECTORIES) || !containers[name]?.configuration,
                  task: async (ctx, task): Promise<void> => {
                    const deleted = await this.deleteFolder(task, join(process.cwd(), containers[name].configuration))

                    if (deleted) {
                      // delete from dockercompose file as well
                      await this.configLock.unlock([
                        {
                          path: `services.${name}`,
                          root: true
                        }
                      ])

                      // unlock directories from local lock file
                      this.lockerLocal.addUnlock({
                        path: `${name}.${DockerHelperLock.DIRECTORIES}`
                      })
                    }
                  }
                },

                {
                  title: 'Updating lock file...',
                  task: async (): Promise<void> => {
                    // ensure lock file entries are not empty
                    await this.lockerLocal.unlockAll()
                    const lock = await this.lockerLocal.getLockFile<LockFile>()
                    const containers = lock[LockPaths.DOCKER_HELPER]

                    await Promise.all(
                      Object.keys(containers).map((c) => {
                        if (Object.keys(containers[c]).length === 0) {
                          this.lockerLocal.addUnlock({
                            path: name
                          })
                        }
                      })
                    )
                  }
                }
              ]
            }
          })

          return task.newListr(
            subtasks.map((t) => {
              return this.tasks.indent(t.tasks, { rendererOptions: { collapse: true } }, { title: `Processing: ${t.name}` })
            }),
            {
              rendererOptions: { collapse: false },
              concurrent: false,
              exitOnError: false
            }
          )
        }
      },

      {
        title: 'Checking general folders for clean-up.',
        task: (ctx, task): Listr =>
          task.newListr([
            {
              task: async (ctx, task): Promise<void> => {
                try {
                  const dir = fs.readdirSync(join(process.cwd(), flags.output))
                  if (dir.length === 0) {
                    await this.deleteFolder(task, join(process.cwd(), flags.output))
                  }
                } catch (e) {
                  this.logger.debug(e.message)
                }
              }
            },

            {
              task: async (ctx, task): Promise<void> => {
                try {
                  const dir = fs.readdirSync(join(process.cwd(), flags['volumes-folder']))
                  if (dir.length === 0) {
                    await this.deleteFolder(task, join(process.cwd(), flags['volumes-folder']))
                  }
                } catch (e) {
                  this.logger.debug(e.message)
                }
              }
            }
          ])
      }
    ])
  }

  // do this with locker
  private getInitialFromPriorConfiguration (config: DockerComposeFile, choices: string[]): number[] | number {
    return config?.services
      ? Object.keys(config?.services).reduce((o, val) => {
        choices.forEach((v, i) => {
          if (v === val) {
            o = [ ...o, i ]
          }
        })
        return o
      }, [])
      : []
  }

  private async deleteFolder (task: ListrTaskWrapper<any, any>, folder?: string): Promise<boolean> {
    const { flags } = this.parse(DockerContainerCommand)

    let prompt: boolean = flags.force
    if (!prompt) {
      prompt = await task.prompt({
        type: 'Toggle',
        message: `Do you want to really delete: ${folder}`,
        initial: true
      })
    }

    if (prompt) {
      try {
        if (fs.existsSync(folder)) {
          fs.emptyDirSync(folder)
          fs.removeSync(folder)
          task.title = `Deleted: ${folder}`

          return true
        } else {
          task.skip(`Not-Found: ${folder}`)
        }
      } catch (e) {
        this.message.debug(e.message)
        throw new Error(`Can not delete folder: ${folder}`)
      }
    }

    return false
  }
}
