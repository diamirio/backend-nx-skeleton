import type { ConfigRemove } from '@cenk1cenk2/boilerplate-oclif'
import { ConfigBaseCommand, ConfigCommandChoices, ConfigTypes, createTable } from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import * as fs from 'fs-extra'
import type { Listr, ListrDefaultRenderer, ListrTask, ListrTaskWrapper } from 'listr2'
import { dirname, join } from 'path'

import type { DockerContainerAddCtx } from '@context/docker/containers'
import { DockerContainersPurgeCtx } from '@context/docker/containers'
import { DockerHelper } from '@helpers/docker.helper'
import type { DockerComposeFile } from '@helpers/docker.helper.interface'
import type { DockerNxCtx } from '@interfaces/commands/docker/nx'
import type { LocalLockFile } from '@interfaces/lock-file.interface'
import { DockerHelperLock, LocalLockPaths } from '@interfaces/lock-file.interface'
import { readBrownieWorkspaceContainers } from '@webundsoehne/nx-tools/dist/integration/brownie'
import type { BrownieAvailableContainers } from '@webundsoehne/nx-tools/dist/integration/brownie.interface'

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
    expose: flags.boolean({
      char: 'e',
      description: 'Expose ports from the container.'
    }),
    'volumes-folder': flags.string({
      char: 'V',
      description: 'Output to volumes folder.',
      default: 'volumes'
    }),
    'files-folder': flags.string({
      char: 'F',
      description: 'Output to included folder.',
      default: 'files'
    })
  }

  static description = 'Create docker-compose configuration from boilerplates.'

  public choices: (ConfigCommandChoices | string)[] = [ 'Nx', ConfigCommandChoices.add, ConfigCommandChoices.show, ConfigCommandChoices.remove, 'Purge' ]

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
          expose: flags.expose,
          'volumes-folder': flags['volumes-folder'],
          'files-folder': flags['files-folder']
        }
      })
    }
  }

  public async nxConfig (): Promise<void> {
    this.tasks.add<DockerNxCtx>([
      {
        task: (): Listr => this.helpers.docker.generateGetContainerTasks()
      },

      {
        title: 'Reading integration...',
        task: (ctx, task): void => {
          ctx.prompt = readBrownieWorkspaceContainers()

          task.title = `Found containers: ${ctx.prompt.join(', ')}`
        }
      },

      {
        task: (ctx): Listr => this.helpers.docker.generateDockerTasks(ctx.prompt)
      }
    ])

    const { ctx } = await this.finally<DockerNxCtx>()

    // this is done auto in config commands but not in this one, due to my lib
    await this.configLock.lock([
      {
        data: ctx.config,
        merge: true,
        root: this.configType === ConfigTypes.localRoot
      }
    ])
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
    const lock = await this.locker.getLockFile<LocalLockFile>()
    const containers = lock[LocalLockPaths.DOCKER_HELPER]

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
                  skip: (ctx): boolean =>
                    !ctx.prompt.purge.includes(DockerHelperLock.VOLUMES) || !containers[name]?.volumes || Object.keys(containers[name]?.volumes).length === 0,
                  task: (_, task): Listr => {
                    const subtasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] = Object.entries(containers[name].volumes).map(([ key, v ]) => ({
                      task: async (_, task): Promise<void> => {
                        const deleted = await this.deleteArtifacts(task, join(process.cwd(), v))

                        if (deleted || deleted === 'unlock') {
                          // unlock volumes from lock file
                          this.locker.addUnlock({
                            path: `${name}.${DockerHelperLock.VOLUMES}.${key}`
                          })
                        }
                      }
                    }))

                    return task.newListr(subtasks)
                  }
                },

                {
                  title: 'Deleting configuration...',
                  skip: (ctx): boolean =>
                    !ctx.prompt.purge.includes(DockerHelperLock.DIRECTORIES) || !containers[name]?.configuration || Object.keys(containers[name]?.configuration).length === 0,
                  task: (_, task): Listr => {
                    const subtasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] = Object.entries(containers[name].configuration).map(([ key, v ]) => ({
                      task: async (_, task): Promise<void> => {
                        const deleted = await this.deleteArtifacts(task, join(process.cwd(), v))

                        if (deleted || deleted === 'unlock') {
                          // unlock directories from local lock file
                          this.locker.addUnlock({
                            path: `${name}.${DockerHelperLock.DIRECTORIES}.${key}`
                          })
                        }
                      }
                    }))

                    return task.newListr([
                      {
                        task: async (): Promise<void> => {
                          await this.configLock.unlock([
                            {
                              path: `services.${name}`,
                              root: true
                            }
                          ])
                        }
                      },
                      ...subtasks
                    ])
                  }
                },

                {
                  title: 'Deleting files...',
                  skip: (ctx): boolean =>
                    !ctx.prompt.purge.includes(DockerHelperLock.FILES) || !containers[name]?.configuration || Object.keys(containers[name]?.configuration).length === 0,
                  task: (_, task): Listr => {
                    const subtasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] = Object.entries(containers[name].files).map(([ key, v ]) => ({
                      task: async (_, task): Promise<void> => {
                        const deleted = await this.deleteArtifacts(task, join(process.cwd(), v))

                        if (deleted || deleted === 'unlock') {
                          // unlock directories from local lock file
                          this.locker.addUnlock({
                            path: `${name}.${DockerHelperLock.FILES}.${key}`
                          })
                        }
                      }
                    }))

                    return task.newListr([
                      {
                        task: async (): Promise<void> => {
                          await this.configLock.unlock([
                            {
                              path: `services.${name}`,
                              root: true
                            }
                          ])
                        }
                      },
                      ...subtasks
                    ])
                  }
                },

                {
                  title: 'Updating lock file...',
                  task: async (): Promise<void> => {
                    // ensure lock file entries are not empty
                    await this.locker.unlockAll()
                    const lock = await this.locker.getLockFile<LocalLockFile>()
                    const containers = lock[LocalLockPaths.DOCKER_HELPER]

                    await Promise.all(
                      Object.keys(containers).map((c) => {
                        if (containers[c]?.configuration && Object.keys(containers[c].configuration).length === 0) {
                          this.locker.addUnlock({
                            path: `${c}.${DockerHelperLock.DIRECTORIES}`
                          })
                        }

                        if (containers[c]?.volumes && Object.keys(containers[c].volumes).length === 0) {
                          this.locker.addUnlock({
                            path: `${c}.${DockerHelperLock.VOLUMES}`
                          })
                        }

                        if (Object.keys(containers[c]).length === 0) {
                          this.locker.addUnlock({
                            path: c
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
        task: (_, task): Listr =>
          task.newListr([
            {
              task: async (_, task): Promise<void> => {
                try {
                  const dir = fs.readdirSync(join(process.cwd(), flags.output))

                  if (dir.length === 0) {
                    await this.deleteArtifacts(task, join(process.cwd(), flags.output))
                  }
                } catch (e) {
                  this.logger.debug(e.message)
                }
              }
            },

            {
              task: async (_, task): Promise<void> => {
                try {
                  const dir = fs.readdirSync(join(process.cwd(), flags['volumes-folder']))

                  if (dir.length === 0) {
                    await this.deleteArtifacts(task, join(process.cwd(), flags['volumes-folder']))
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

  private async deleteArtifacts (task: ListrTaskWrapper<any, any>, path: string): Promise<boolean | 'unlock'> {
    const { flags } = this.parse(DockerContainerCommand)

    if (fs.existsSync(path)) {
      let prompt: boolean = flags.force

      if (!prompt) {
        prompt = await task.prompt({
          type: 'Toggle',
          message: `Will delete: ${path}`,
          initial: true
        })
      }

      if (prompt) {
        try {
          if (fs.statSync(path).isDirectory()) {
            await fs.emptyDir(path)
            await fs.remove(path)

            task.title = `Deleted folder: ${path}`
          } else if (fs.statSync(path).isFile()) {
            await fs.remove(path)

            task.title = `Deleted file: ${path}`
          }

          if (fs.readdirSync(dirname(path)).length === 0) {
            this.logger.debug(`After removing ${path}, folder is empty, will remove it as well.`)

            await fs.remove(dirname(path))
          }

          return true
        } catch (e) {
          this.message.debug(e.message)
          throw new Error(`Can not delete folder: ${path}`)
        }
      }
    } else {
      // if it does not already exists we want to unlock unnecessary key
      return 'unlock'
    }

    return false
  }
}
