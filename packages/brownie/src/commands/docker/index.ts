import type { ConfigCommandSetup, InferFlags } from '@cenk1cenk2/oclif-common'
import { ConfigCommand, Flags, fs, LockerService, MergeStrategy } from '@cenk1cenk2/oclif-common'
import type { Listr, ListrDefaultRenderer, ListrTask } from 'listr2'
import { dirname, join } from 'path'

import type { DockerContainerAddCtx } from '@context/docker/containers'
import { DockerContainersPurgeCtx } from '@context/docker/containers'
import { BrownieLocker } from '@helpers/brownie-locker'
import { DockerHelper } from '@helpers/docker.helper'
import type { DockerComposeFile } from '@helpers/docker.helper.interface'
import { DockerCommandChoices } from '@interfaces/commands/docker/choices.constants'
import type { DockerNxCtx } from '@interfaces/commands/docker/nx'
import type { LocalLockFile } from '@interfaces/lock-file.interface'
import { DockerHelperLock, LocalLockPaths } from '@interfaces/lock-file.interface'
import { readBrownieWorkspaceContainers } from '@webundsoehne/nx-tools/dist/integration/brownie'
import type { BrownieAvailableContainers } from '@webundsoehne/nx-tools/dist/integration/brownie.interface'

export class Docker extends ConfigCommand<DockerCommandChoices, LocalLockFile, DockerContainerAddCtx | DockerContainersPurgeCtx | DockerNxCtx, InferFlags<typeof Docker>> {
  static flags = {
    force: Flags.boolean({ char: 'f', description: 'Force overwrites.' }),
    output: Flags.string({
      char: 'o',
      description: 'Output folder for the Docker files.',
      default: '.docker'
    }),
    volume: Flags.boolean({
      char: 'v',
      description: 'Use optional persistent volumes with the containers.'
    }),
    expose: Flags.boolean({
      char: 'e',
      description: 'Expose ports from the container.'
    }),
    file: Flags.string({
      char: 'F',
      description: 'Compose file path.',
      default: 'docker-compose.yml'
    }),
    ['volumes-folder']: Flags.string({
      char: 'V',
      description: 'Output to volumes folder.',
      default: 'volumes'
    }),
    ['files-folder']: Flags.string({
      char: 'F',
      description: 'Output to included folder.',
      default: 'files'
    })
  }

  static description = 'Create docker-compose configuration from boilerplates.'

  private helpers: { docker: DockerHelper }
  private compose: LockerService<DockerComposeFile>

  async setup (): Promise<ConfigCommandSetup<DockerCommandChoices>> {
    return {
      choices: {
        [DockerCommandChoices.NX]: this.nx,
        [DockerCommandChoices.SHOW]: this.show,
        [DockerCommandChoices.ADD]: this.add,
        [DockerCommandChoices.REMOVE]: this.remove,
        [DockerCommandChoices.PURGE]: this.purge
      },
      locker: new BrownieLocker(LocalLockPaths.DOCKER_HELPER)
    }
  }

  async shouldRunBefore (): Promise<void> {
    this.helpers = {
      docker: new DockerHelper(this, {
        flags: {
          force: this.flags.force,
          output: this.flags.output,
          volume: this.flags.volume,
          expose: this.flags.expose,
          ['volumes-folder']: this.flags['volumes-folder'],
          ['files-folder']: this.flags['files-folder']
        }
      })
    }

    this.compose = new LockerService<DockerComposeFile>(join(process.cwd(), this.flags.file), this.parser.getParser('yml'))

    this.tasks.options = { rendererSilent: true }
  }

  async shouldRunAfter (): Promise<void> {
    await this.locker.all()
  }

  async nx (): Promise<void> {
    this.tasks.add<DockerNxCtx>([
      {
        task: (): Listr<any, 'silent'> => this.helpers.docker.generateGetContainerTasks()
      },

      {
        task: (ctx): void => {
          this.logger.debug('Reading integration...')
          ctx.prompt = readBrownieWorkspaceContainers()

          this.logger.info('Found containers: %s', ctx.prompt.join(', '))
        }
      },

      {
        task: (ctx): Listr<any, 'silent'> => this.helpers.docker.generateDockerTasks(ctx.prompt)
      },

      {
        task: (ctx): Promise<void> =>
          this.compose.lock({
            data: ctx.config,
            merge: MergeStrategy.EXTEND
          })
      }
    ])
  }

  async add (): Promise<void> {
    this.setCtxDefaults({ config: await this.compose.tryRead() })

    this.tasks.add<DockerContainerAddCtx>([
      {
        task: (): Listr<any, 'silent'> => this.helpers.docker.generateGetContainerTasks()
      },

      // get user prompts
      {
        task: async (ctx, task): Promise<BrownieAvailableContainers[]> =>
          ctx.prompt = await task.prompt<BrownieAvailableContainers[]>({
            type: 'AutoComplete',
            multiple: true,
            message: 'Please select which containers you want to add.',
            choices: Object.keys(ctx.containers),
            initial: this.getInitialFromPriorConfiguration(ctx.config, Object.keys(ctx.containers))
          })
      },

      {
        task: (ctx): Listr<any, 'silent'> => this.helpers.docker.generateDockerTasks(ctx.prompt)
      },

      {
        task: (ctx): Promise<void> => this.compose.write(ctx.config)
      }
    ])
  }

  async show (): Promise<void> {
    const config = await this.compose.tryRead()

    if (config?.services ? Object.keys(config.services).length > 0 : false) {
      this.table(
        Object.entries(config.services).map(([service, val]) => ({ service, image: val.image ?? val.build })),
        {
          container: {
            header: 'Container'
          },
          image: {
            header: 'Image'
          }
        }
      )
    } else {
      this.logger.warn('Configuration file is empty.')
    }

    this.logger.info('Configuration file is listed.')
  }

  async remove (): Promise<void> {
    const config = await this.compose.tryRead()

    // get prompts for which one to remote
    const prompt: string[] = await this.prompt({
      type: 'MultiSelect',
      message: 'Please select configuration to delete.',
      choices: config?.services ? Object.keys(config.services) : []
    })

    // if nothing selected in the prompt
    if (prompt.length === 0) {
      this.logger.warn('Nothing selected to remove.')

      return
    }

    await Promise.all(
      prompt.map(async (k) => {
        delete config.services[k]
      })
    )

    await this.compose.write(config)

    this.logger.info('Removed entries: %s', prompt.join(', '))
  }

  async purge (): Promise<void> {
    const lock = await this.locker.tryRead()
    const containers = lock[LocalLockPaths.DOCKER_HELPER]

    if (!containers || Object.keys(containers).length === 0) {
      throw new Error('Nothing in lock file to purge.')
    }

    this.setCtxDefaults(new DockerContainersPurgeCtx())

    this.tasks.add<DockerContainersPurgeCtx>([
      {
        task: async (ctx): Promise<void> => {
          ctx.prompt.containers = await this.prompt({
            type: 'MultiSelect',
            message: 'Which containers you want to apply this on?',
            choices: Object.keys(containers)
          })

          this.logger.info('Will apply on containers: %s', ctx.prompt.containers.join(', '))
        }
      },

      {
        skip: (ctx): boolean => ctx.prompt.containers.length === 0,
        task: async (ctx): Promise<void> => {
          ctx.prompt.purge = await this.prompt({
            type: 'MultiSelect',
            message: 'Which data you want to purge?',
            choices: Object.values(DockerHelperLock)
          })

          this.logger.info('Will purge: %s', ctx.prompt.purge.join(', '))
        }
      },

      {
        skip: (ctx): boolean => ctx.prompt.purge.length === 0,
        task: (ctx, task): Listr => {
          this.logger.info('Processing containers...')

          const subtasks = ctx.prompt.containers.map((name): { name: string, tasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] } => {
            return {
              name,
              tasks: [
                {
                  skip: (ctx): boolean =>
                    !ctx.prompt.purge.includes(DockerHelperLock.VOLUMES) || !containers[name]?.volumes || Object.keys(containers[name]?.volumes).length === 0,
                  task: (_, task): Listr => {
                    const subtasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] = Object.entries(containers[name].volumes).map(([key, v]) => ({
                      task: async (): Promise<void> => {
                        const deleted = await this.deleteArtifacts(join(process.cwd(), v))

                        if (deleted || deleted === 'unlock') {
                          // unlock volumes from lock file
                          this.locker.addUnlock({
                            path: [name, DockerHelperLock.VOLUMES, key]
                          })
                        }

                        this.logger.info('Deleted volume: %s', v)
                      }
                    }))

                    return task.newListr(subtasks)
                  }
                },

                {
                  skip: (ctx): boolean =>
                    !ctx.prompt.purge.includes(DockerHelperLock.DIRECTORIES) || !containers[name]?.configuration || Object.keys(containers[name]?.configuration).length === 0,
                  task: (): Listr => {
                    this.logger.info('Deleting configuration...')

                    const subtasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] = Object.entries(containers[name].configuration).map(([key, v]) => ({
                      task: async (): Promise<void> => {
                        const deleted = await this.deleteArtifacts(join(process.cwd(), v))

                        if (deleted || deleted === 'unlock') {
                          // unlock directories from local lock file
                          this.locker.addUnlock({
                            path: [name, DockerHelperLock.DIRECTORIES, key]
                          })
                        }
                      }
                    }))

                    return task.newListr([
                      {
                        task: async (): Promise<void> => {
                          await this.compose.unlock({
                            path: ['services', name]
                          })
                        }
                      },
                      ...subtasks
                    ])
                  }
                },

                {
                  skip: (ctx): boolean => !ctx.prompt.purge.includes(DockerHelperLock.FILES) || !containers[name]?.files || Object.keys(containers[name]?.files).length === 0,
                  task: (): Listr => {
                    this.logger.info('Deleting files...')

                    const subtasks: ListrTask<DockerContainersPurgeCtx, ListrDefaultRenderer>[] = Object.entries(containers[name].files).map(([key, v]) => ({
                      task: async (): Promise<void> => {
                        const deleted = await this.deleteArtifacts(join(process.cwd(), v))

                        if (deleted || deleted === 'unlock') {
                          // unlock directories from local lock file
                          this.locker.addUnlock({
                            path: [name, DockerHelperLock.FILES, key]
                          })
                        }
                      }
                    }))

                    return task.newListr([
                      {
                        task: async (): Promise<void> => {
                          await this.compose.unlock({
                            path: ['services', name]
                          })
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
                    const lock = await this.locker.tryRead() ?? {}
                    const containers = lock[LocalLockPaths.DOCKER_HELPER]

                    await Promise.all(
                      Object.keys(containers).map((c) => {
                        if (containers[c]?.configuration && Object.keys(containers[c].configuration).length === 0) {
                          this.locker.addUnlock({
                            path: [c, DockerHelperLock.DIRECTORIES]
                          })
                        }

                        if (containers[c]?.volumes && Object.keys(containers[c].volumes).length === 0) {
                          this.locker.addUnlock({
                            path: [c, DockerHelperLock.VOLUMES]
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
              return this.tasks.indent(t.tasks, { rendererOptions: { collapse: true } })
            }),
            {
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
              task: async (): Promise<void> => {
                try {
                  const dir = fs.readdirSync(join(process.cwd(), this.flags.output))

                  if (dir.length === 0) {
                    await this.deleteArtifacts(join(process.cwd(), this.flags.output))
                  }
                } catch (e) {
                  this.logger.debug(e.message)
                }
              }
            },

            {
              task: async (): Promise<void> => {
                try {
                  const dir = await fs.readdir(join(process.cwd(), this.flags['volumes-folder']))

                  if (dir.length === 0) {
                    await this.deleteArtifacts(join(process.cwd(), this.flags['volumes-folder']))
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
            o = [...o, i]
          }
        })

        return o
      }, [])
      : []
  }

  private async deleteArtifacts (path: string): Promise<boolean | 'unlock'> {
    if (this.fs.exists(path)) {
      let prompt: boolean = this.flags.force

      if (!prompt) {
        prompt = await this.prompt({
          type: 'Toggle',
          message: `Will delete: ${path}`,
          initial: true
        })
      }

      if (prompt) {
        try {
          if (this.fs.stats(path).isDirectory()) {
            await this.fs.remove(path)

            this.logger.debug('Deleted folder: %s', path)
          } else if (this.fs.stats(path).isFile()) {
            await this.fs.remove(path)

            this.logger.debug('Deleted file: %s', path)
          }

          if (fs.readdirSync(dirname(path)).length === 0) {
            this.logger.debug('After removing %s, folder is empty, will remove it as well.', path)

            await fs.remove(this.fs.dirname(path))
          }

          return true
        } catch (e) {
          this.logger.debug(e.message)

          throw new Error(`Can not delete: ${path}`)
        }
      }
    } else {
      // if it does not already exists we want to unlock unnecessary key
      return 'unlock'
    }

    return false
  }
}
