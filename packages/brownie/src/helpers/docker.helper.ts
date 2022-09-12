import type { ConfigCommand } from '@cenk1cenk2/oclif-common'
import { merge, MergeStrategy } from '@cenk1cenk2/oclif-common'
import axios from 'axios'
import fs from 'fs-extra'
import globby from 'globby'
import type { Listr, ListrDefaultRenderer, ListrTask } from 'listr2'
import { EOL } from 'os'
import { dirname, join, relative } from 'path'

import type { AvailableContainers, DockerComposeFile, DockerHelperCtx } from './docker.helper.interface'
import { VolumeModes } from './docker.helper.interface'
import { jinja } from '@helpers/jinja.helper'
import type { LocalLockFile, LocalLockPaths } from '@interfaces/lock-file.interface'
import { DockerHelperLock } from '@interfaces/lock-file.interface'
import type { BrownieAvailableContainers } from '@webundsoehne/nx-tools'

export class DockerHelper {
  public dockerConfigLocation: string
  public templatesLocation: string

  constructor (
    private readonly cmd: ConfigCommand<any>,
    private readonly options: { flags: { output: string, force?: boolean, volume?: boolean, expose?: boolean, ['volumes-folder']: string, ['files-folder']: string } }
  ) {
    cmd.logger.debug('DockerHelper initiated.')

    this.dockerConfigLocation = join(this.cmd.cs.oclif.root, 'templates', 'containers')
    this.templatesLocation = join(this.cmd.cs.oclif.root, 'templates', 'base')
  }

  generateGetContainerTasks (): Listr<DockerHelperCtx> {
    return this.cmd.tasks.newListr<DockerHelperCtx>([
      // get available containers
      {
        task: async (ctx): Promise<void> => {
          this.cmd.logger.info('Looking for available containers.')

          ctx.containers = await this.getAvailableContainers()
        }
      },

      // check if there is available containers
      {
        skip: (ctx): boolean => Object.keys(ctx.containers).length !== 0,
        task: (): void => {
          throw new Error(`No configuration files found in "${this.templatesLocation}".`)
        }
      }
    ])
  }

  generateDockerTasks (containers: BrownieAvailableContainers[]): Listr {
    return this.cmd.tasks.newListr<DockerHelperCtx>([
      // be sure that necassary folders are created
      {
        title: 'Creating output directory.',
        task: async (): Promise<void> => this.cmd.fs.mkdir(this.options.flags.output)
      },

      // find selected container
      {
        title: 'Processing containers.',
        task: (ctx, task): Listr => {
          // initialize variables
          ctx.context = {}
          containers.filter((c) => Object.keys(ctx.containers).includes(c))

          // fail safe
          const templateCheck = containers.filter((c) => !Object.keys(ctx.containers).includes(c))

          if (templateCheck.length > 0) {
            this.cmd.logger.warn(`Containers skipped for being unknown: ${templateCheck.join(', ')}`)
          }

          // only process known containers
          containers = containers.filter((c) => Object.keys(ctx.containers).includes(c))

          const subtasks = containers.map((name): { name: string, tasks: ListrTask<DockerHelperCtx, ListrDefaultRenderer>[] } => {
            return {
              name: ctx.containers[name].name,
              tasks: [
                {
                  title: 'Initiating...',
                  task: async (ctx, task): Promise<void> => {
                    // create jinja context
                    ctx.context[name] = {
                      name: ctx.containers[name].name,
                      dir: join(this.options.flags.output, ctx.containers[name].name),
                      path: ctx.containers[name].path,
                      output: this.options.flags.output,
                      volumeDir: join(this.options.flags['volumes-folder'], ctx.containers[name].name),
                      fileDir: join(this.options.flags.output, ctx.containers[name].name, this.options.flags['files-folder'])
                    }

                    task.title = 'Initialization complete.'
                  }
                },

                {
                  title: 'Processing Dockerfile...',
                  skip: (): boolean => !this.checkArrayIsExactlyOneInLength(ctx.containers[name]?.dockerfile),
                  task: async (ctx, task): Promise<void> => {
                    ctx.context[name].dockerfile = ctx.containers[name].dockerfile[0]

                    // output file
                    const output = join(ctx.context[name].dir, 'Dockerfile')

                    // ask for overwrite
                    if (
                      !this.options.flags.force &&
                      !await this.cmd.prompt({
                        type: 'Toggle',
                        initial: true,
                        message: `Would you like to overwrite Dockerfile file: ${output}`
                      })
                    ) {
                      this.cmd.logger.warn('Skipping Dockerfile file overwrite: %s', name)

                      return
                    }

                    // create directory and files
                    await this.cmd.fs.mkdir(ctx.context[name].dir)

                    // write to file
                    await this.cmd.parser.write(output, ctx.context[name].dockerfile)

                    // lock necassary information
                    this.cmd.locker.addLock<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                      path: ctx.containers[name].name,
                      data: {
                        [DockerHelperLock.DIRECTORIES]: [output]
                      },
                      merge: MergeStrategy.EXTEND
                    })

                    task.title = 'Dockerfile files generated.'
                  }
                },

                {
                  title: 'Processing volumes...',
                  skip: (): boolean => !this.checkArrayIsExactlyOneInLength(ctx.containers[name]?.volumes),
                  task: async (ctx, task): Promise<void> => {
                    // doing this the counter intuitive way because of globbing, first globbing then filtering out unwanted
                    ctx.context[name].volumes = await this.readYamlTemplate(ctx.containers[name].volumes[0], ctx.context[name])

                    // process all volumes async
                    await Promise.all(
                      ctx.context[name].volumes.map(async (volume) => {
                        // create asset
                        const asset = {
                          from: join(ctx.containers[name].files, volume.from),
                          to: join(ctx.context[name].volumeDir)
                        }

                        if ([VolumeModes.FILE, VolumeModes.URL].includes(volume.mode)) {
                          asset.to = join(ctx.context[name].fileDir, volume.from)

                          // if this is a file copy it directly
                          this.cmd.logger.debug(`Copying file: ${volume.from} -> ${asset.to}`)

                          try {
                            await this.cmd.fs.mkdir(this.cmd.fs.dirname(asset.to))

                            if (volume.mode === VolumeModes.FILE) {
                              task.output = `Copying asset: ${asset.from} -> ${asset.to}`

                              await fs.copy(asset.from, asset.to)
                            } else {
                              if (!volume.url) {
                                throw new Error(`Can not copy asset ${asset.from} -> ${asset.to}, since it is marked as url but no url has been given.`)
                              }

                              asset.from = volume.url

                              const download = await axios.get(asset.from, {
                                onDownloadProgress: (progress) => {
                                  task.output = `Downloading file: ${asset.from} -> ${asset.to} [ ${progress.percent * 100}% ]`
                                }
                              })

                              await fs.writeFile(asset.to, download.data)
                            }

                            // BUG: if we set to chmod the file it goes to hell and deletes the whole file? what a weird bug
                            // // set permissions
                            // if (volume.perm) {
                            //   this.cmd.logger.debug(`Setting asset permission ${asset.to}: ${volume.perm}`)
                            //   await fs.chmod(asset.to, volume.perm)
                            // }

                            this.cmd.locker.addLock<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                              path: ctx.containers[name].name,
                              data: {
                                [DockerHelperLock.FILES]: [asset.to]
                              },
                              merge: MergeStrategy.EXTEND
                            })
                          } catch (e) {
                            this.cmd.logger.warn('Error while copying asset: %s', e.message)

                            // just delete this from the list
                            ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)
                          }
                        } else if (volume.mode === VolumeModes.DIR) {
                          // if this is a directory we have to create the directory separately and copy files in them, because of how fs works in node
                          this.cmd.logger.debug('Copying directory: %s -> %s', asset.from, asset.to)

                          try {
                            asset.to = join(asset.to, volume.from)

                            await this.cmd.fs.mkdir(this.cmd.fs.dirname(asset.to))
                            await fs.copy(asset.from, asset.to)

                            // set permissions
                            if (volume.perm) {
                              await fs.chmod(asset.to, volume.perm)
                            }

                            this.cmd.locker.addLock<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                              path: ctx.containers[name].name,
                              data: {
                                [DockerHelperLock.DIRECTORIES]: [asset.to]
                              },
                              merge: MergeStrategy.EXTEND
                            })
                          } catch (e) {
                            this.cmd.logger.warn('Error while copying folder: %s', e.message)

                            // just delete this from the list
                            ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)
                          }
                        } else if (volume.mode === VolumeModes.VOLUME) {
                          // we can add persistent volumes if you want to keep data
                          let prompt: boolean

                          asset.to = join(asset.to, volume.from)

                          // only asks this with this flag
                          if (this.options.flags.volume) {
                            prompt = await task.prompt({
                              type: 'Toggle',
                              message: `Do you want to add persistent volume for the container "${name}" at "${asset.to} -> ${volume.to}"?`,
                              initial: true
                            })
                          }

                          // it will clear out this entry
                          if (prompt) {
                            await this.cmd.fs.mkdir(asset.to)

                            this.cmd.locker.addLock<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                              path: ctx.containers[name].name,
                              data: {
                                [DockerHelperLock.VOLUMES]: [asset.to]
                              },
                              merge: MergeStrategy.EXTEND
                            })
                          } else {
                            ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)
                          }
                        } else if (volume.mode === VolumeModes.MOUNT) {
                          this.cmd.logger.debug('Running in persistent volume mode for: %s with %o', name, asset)
                        } else {
                          throw new Error('Unknown volume mode this may be do to templating error.')
                        }
                      })
                    )

                    task.title = 'Volumes are generated.'
                  }
                },

                // processing environment files
                {
                  title: 'Processing environment files...',
                  skip: (): boolean => !this.checkArrayIsExactlyOneInLength(ctx.containers[name]?.env),
                  task: async (): Promise<void> => {
                    // add this to context
                    ctx.context[name].env = ctx.containers[name].env[0]

                    // output file
                    const output = join(ctx.context[name].dir, '.env')

                    // ask for overwrite
                    if (
                      !this.options.flags.force &&
                      !await this.cmd.prompt({
                        type: 'Toggle',
                        initial: true,
                        message: `Would you like to overwrite .env file: ${output}`
                      })
                    ) {
                      this.cmd.logger.warn('Skipping .env file overwrite: %s', name)

                      return
                    }

                    // read the yaml template for one file
                    const file = await this.readYamlTemplate(ctx.context[name].env, ctx.context[name])

                    // parse environment variables, this is more reasonable than jinja
                    const buffer = Object.entries(file).reduce((o, [key, val]) => {
                      if (val) {
                        return [...o, `${key}=${val}`]
                      } else {
                        return [...o, `${key}=`]
                      }
                    }, [])

                    // create directory and files
                    await this.cmd.fs.mkdir(ctx.context[name].dir)

                    // write to file
                    await this.cmd.fs.write(output, buffer.join(EOL))

                    // lock necassary information
                    this.cmd.locker.addLock<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                      path: ctx.containers[name].name,
                      data: {
                        [DockerHelperLock.DIRECTORIES]: [output]
                      },
                      merge: MergeStrategy.EXTEND
                    })

                    this.cmd.logger.info('Environment files generated.')
                  }
                },

                // processing exposed ports
                {
                  skip: (): boolean => !this.checkArrayIsExactlyOneInLength(ctx.containers[name]?.ports) || !this.options.flags.expose,
                  task: async (ctx, task): Promise<void> => {
                    this.cmd.logger.info('Processing exposed ports...')

                    // read the yaml template for one file
                    const file = await this.readYamlTemplate<string[]>(ctx.containers[name].ports[0], ctx.context[name])

                    // only asks this with this flag
                    if (this.options.flags.expose) {
                      const prompt = await task.prompt({
                        type: 'Toggle',
                        message: `Do you want to add exposed ports for the container "${name}" at "${file.join(', ')}"?`,
                        initial: true
                      })

                      if (prompt) {
                        ctx.context[name].ports = file
                      }
                    }

                    this.cmd.logger.info('Exposed ports.')
                  }
                },

                // creating configuration
                {
                  task: async (ctx): Promise<void> => {
                    this.cmd.logger.info('Creating configuration.')

                    try {
                      // read the template
                      const base = await this.cmd.cs.read<DockerComposeFile>(join(this.templatesLocation, 'docker-compose.yml'))

                      ctx.context[name].config = await this.readYamlTemplate(ctx.containers[name].path, ctx.context[name])

                      if (ctx.context[name].config?.image) {
                        const { image, ...rest } = ctx.context[name].config

                        ctx.context[name].config = rest
                        ctx.context[name].image = image
                      }

                      if (Object.keys(ctx.context[name].config).length === 0) {
                        delete ctx.context[name].config
                      }

                      this.cmd.logger.debug('Context for "%s":\n%o', name, ctx.context[name])

                      const template = await this.readYamlTemplate<DockerComposeFile>(join(this.templatesLocation, 'docker-compose.yml.j2'), ctx.context[name])

                      // configuration can still be null which is not mergeable
                      if (template) {
                        ctx.config = merge(MergeStrategy.OVERWRITE, base, ctx.config, template)
                      } else {
                        throw new Error(`Container "${ctx.containers[name].name}" does not have a valid template.`)
                      }
                    } catch (e) {
                      throw new Error(e)
                    }

                    this.cmd.logger.info('Configuration generated.')
                  }
                }
              ]
            }
          })

          return task.newListr(
            subtasks.map((t) => {
              return this.cmd.tasks.indent(t.tasks, { rendererOptions: { collapse: true } })
            }),
            {
              rendererOptions: { collapse: false }
            }
          )
        }
      }
    ])
  }

  async getAvailableContainers (): Promise<AvailableContainers> {
    // some trickery to make it async
    return (
      await Promise.all(
        (
          await globby(['**/config.yml(.j2)?'], { cwd: this.dockerConfigLocation, absolute: true })
        ).map(async (item) => {
          const base = dirname(item)
          const name = relative(this.dockerConfigLocation, base)

          return {
            name,

            base,

            files: join(base, 'files'),

            path: item,

            dockerfile: await globby(['**/Dockerfile(.j2)?', '**/dockerfile(.j2)?'], {
              cwd: base,
              absolute: true,
              dot: true
            }),

            env: await globby(['**/env.yml(.j2)?'], {
              cwd: base,
              absolute: true,
              dot: true
            }),

            volumes: await globby(['**/volumes.yml(.j2)?'], {
              cwd: base,
              absolute: true,
              dot: true
            }),

            ports: await globby(['**/ports.yml(.j2)?'], {
              cwd: base,
              absolute: true,
              dot: true
            })
          }
        })
      )
    ).reduce<AvailableContainers>((o, item) => ({ ...o, [item.name]: item }), {})
  }

  private async readYamlTemplate<T extends Record<string, any>>(path: string, context: any): Promise<T> {
    const rawTemplate = await this.readTemplate(path, context)

    this.cmd.logger.debug('Parsing template "%s":\n%s', path, rawTemplate)

    return this.cmd.parser.getParser('yml').parse<T>(rawTemplate)
  }

  private async readTemplate (path: string, context: any): Promise<string> {
    let template: string = await this.cmd.fs.read(path)

    // check if this is jinja
    if (this.cmd.fs.extname(path) === '.j2') {
      template = jinja(path).renderString(template, context)
    }

    return template
  }

  private checkArrayIsExactlyOneInLength (array: any[]): boolean {
    // this is implemented to not handle more than file at the moment it is prune to change,
    // when multi-file handling which i think is unnessary atm is required
    if (array.length === 1) {
      return true
    } else if (array.length > 1) {
      // maybe i will add multiple later, even though it is unnessary?
      this.cmd.logger.fatal('Error in configuration. There should be one file per container.\n%o', array)

      throw new Error('Invalid configuration.')
    } else {
      return false
    }
  }
}
