import { BaseCommand, createDirIfNotExists, parseYaml, readFile, readRaw, tasksOverwritePrompt, writeFile } from '@cenk1cenk2/boilerplate-oclif'
import { BrownieAvailableContainers, deepMergeWithArrayOverwrite } from '@webundsoehne/nx-tools'
import fs from 'fs-extra'
import globby from 'globby'
import got, { Progress } from 'got'
import { Listr, ListrDefaultRenderer, ListrTask } from 'listr2'
import { dirname, extname, join, relative } from 'path'
import { v4 as uuidv4 } from 'uuid'

import { AvailableContainers, DockerComposeFile, DockerHelperCtx, VolumeModes } from './docker.helper.interface'
import { jinja } from '@helpers/jinja.helper'
import { DockerHelperLock, LocalLockFile, LocalLockPaths } from '@interfaces/lock-file.interface'

export class DockerHelper {
  public dockerConfigLocation: string = join(this.cmd.config.root, 'templates', 'containers')
  public templatesLocation: string = join(this.cmd.config.root, 'templates', 'base')

  constructor (private readonly cmd: BaseCommand, private readonly options: { flags: { output: string, force?: boolean, volume?: boolean, 'volumes-folder': string } }) {
    cmd.logger.debug('DockerHelper initiated.')
    this.cmd.locker.setRoot(LocalLockPaths.DOCKER_HELPER)
  }

  public generateGetContainerTasks (): Listr {
    return this.cmd.tasks.newListr<DockerHelperCtx>([
      // get available containers
      {
        title: 'Looking for available containers.',
        task: async (ctx): Promise<void> => {
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

  public generateDockerTasks (containers: BrownieAvailableContainers[]): Listr {
    return this.cmd.tasks.newListr<DockerHelperCtx>([
      // be sure that necassary folders are created
      {
        title: 'Creating output directory.',
        task: async (): Promise<void> => await createDirIfNotExists(this.options.flags.output)
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
            this.cmd.message.fail(`Containers skipped for being unknown: ${templateCheck.join(', ')}`)
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
                      volumeDir: join(this.options.flags['volumes-folder'], ctx.containers[name].name)
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
                    try {
                      if (!this.options.flags.force) {
                        await tasksOverwritePrompt(output, task, false)
                      }
                    } catch {
                      this.cmd.message.warn(`Skipping Dockerfile overwrite: ${name}`)

                      return
                    }

                    // create directory and files
                    await createDirIfNotExists(ctx.context[name].dir)

                    // write to file
                    await writeFile(output, await readRaw(ctx.context[name].dockerfile))

                    // lock necassary information
                    this.cmd.locker.add<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                      path: ctx.containers[name].name,
                      data: {
                        [DockerHelperLock.DIRECTORIES]: { [uuidv4()]: output }
                      },
                      merge: true
                    })

                    task.title = 'Dockerfile files generated.'
                  }
                },

                {
                  title: 'Processing volumes...',
                  skip: (): boolean => !this.checkArrayIsExactlyOneInLength(ctx.containers[name]?.volumes),
                  task: async (ctx, task): Promise<void> => {
                    // doing this the counter intuative way because of globbing, first globbing then filtering out unwanted
                    ctx.context[name].volumes = await this.readYamlTemplate(ctx.containers[name].volumes[0], ctx.context[name])

                    // process all volumes async
                    await Promise.all(
                      ctx.context[name].volumes.map(async (volume) => {
                        // create asset
                        const asset = {
                          from: join(ctx.containers[name].files, volume.from),
                          to: join(ctx.context[name].volumeDir)
                        }

                        if ([ VolumeModes.FILE, VolumeModes.URL ].includes(volume.mode)) {
                          // if this is a file copy it directly
                          this.cmd.logger.debug(`Copying file: ${volume.from} -> ${asset.to}`)

                          try {
                            await createDirIfNotExists(asset.to)

                            asset.to = join(asset.to, volume.from)

                            if (volume.mode === VolumeModes.FILE) {
                              task.output = `Copying asset: ${asset.from} -> ${asset.to}`

                              await fs.copy(asset.from, asset.to)
                            } else {
                              if (!volume.url) {
                                throw new Error(`Can not copy asset ${asset.from} -> ${asset.to}, since it is marked as url but no url has been given.`)
                              }

                              asset.from = volume.url

                              const stream = got.stream(asset.from)

                              stream.on('downloadProgress', (progress: Progress) => {
                                task.output = `Downloading file: ${asset.from} -> ${asset.to} [ ${progress?.percent ?? 0 * 100}% ]`
                              })

                              const file = fs.createWriteStream(asset.to)

                              await new Promise((resolve, reject) => {
                                stream.pipe(file)
                                stream.on('close', () => resolve(null))
                                stream.on('error', (err) => reject(err))
                              })
                            }

                            // set permissions
                            if (volume.perm) {
                              await fs.chmod(asset.to, volume.perm)
                            }

                            this.cmd.locker.add<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                              path: ctx.containers[name].name,
                              data: {
                                [DockerHelperLock.DIRECTORIES]: { [uuidv4()]: asset.to }
                              },
                              merge: true
                            })
                          } catch (e) {
                            this.cmd.message.fail(`Error while copying asset: ${e}`)

                            // just delete this from the list
                            ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)
                          }
                        } else if (volume.mode === VolumeModes.DIR) {
                          // if this is a directory we have to create the directory separetly and copy files in them, because of how fs works in node
                          this.cmd.message.debug(`Copying directory: ${asset.from} -> ${asset.to}`)

                          try {
                            asset.to = join(asset.to, volume.from)

                            await createDirIfNotExists(asset.to)
                            await fs.copy(asset.from, asset.to)

                            // set permissions
                            if (volume.perm) {
                              await fs.chmod(asset.to, volume.perm)
                            }

                            this.cmd.locker.add<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                              path: ctx.containers[name].name,
                              data: {
                                [DockerHelperLock.DIRECTORIES]: { [uuidv4()]: asset.to }
                              },
                              merge: true
                            })
                          } catch (e) {
                            this.cmd.message.fail(`Error while copying folder: ${e}`)

                            // just delete this from the list
                            ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)
                          }
                        } else if (volume.mode === VolumeModes.VOLUME) {
                          // we can add persistent volumes if you want to keep data
                          let prompt: boolean

                          // only asks this with this flag
                          if (this.options.flags.volume) {
                            prompt = await task.prompt({
                              type: 'Toggle',
                              message: `Do you want to add persistent volume for the container at "${volume.to}"?`,
                              initial: true
                            })
                          }

                          asset.to = join(asset.to, volume.from)

                          // it will clear out this entry
                          if (prompt) {
                            await createDirIfNotExists(asset.to)

                            this.cmd.locker.add<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                              path: ctx.containers[name].name,
                              data: {
                                [DockerHelperLock.VOLUMES]: { [uuidv4()]: asset.to }
                              },
                              merge: true
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
                  task: async (ctx, task): Promise<void> => {
                    // add this to context
                    ctx.context[name].env = ctx.containers[name].env[0]

                    // output file
                    const output = join(ctx.context[name].dir, '.env')

                    // ask for overwrite
                    try {
                      if (!this.options.flags.force) {
                        await tasksOverwritePrompt(output, task, false)
                      }
                    } catch {
                      this.cmd.message.warn(`Skipping .env file overwrite: ${name}`)

                      return
                    }

                    // read the yaml template for one file
                    const file = await this.readYamlTemplate(ctx.context[name].env, ctx.context[name])

                    // parse environment variables, this is more reasonable than jinja
                    const buffer = Object.entries(file).reduce((o, [ key, val ]) => {
                      if (val) {
                        return [ ...o, `${key}=${val}` ]
                      } else {
                        return [ ...o, `${key}=` ]
                      }
                    }, [])

                    // create directory and files
                    await createDirIfNotExists(ctx.context[name].dir)

                    // write to file
                    await writeFile(output, buffer)

                    // lock necassary information
                    this.cmd.locker.add<LocalLockFile[LocalLockPaths.DOCKER_HELPER]['any']>({
                      path: ctx.containers[name].name,
                      data: {
                        [DockerHelperLock.DIRECTORIES]: { [uuidv4()]: output }
                      },
                      merge: true
                    })

                    task.title = 'Environment files generated.'
                  }
                },

                // creating configuration
                {
                  title: 'Creating configuration.',
                  task: async (ctx, task): Promise<void> => {
                    try {
                      this.cmd.logger.debug(`Context for "${ctx.containers[name].path}":\n%o`, ctx.context[name])

                      // read the template
                      const base = await readFile<DockerComposeFile>(join(this.templatesLocation, 'docker-compose.yml'))
                      const template = await this.readYamlTemplate(ctx.containers[name].path, ctx.context[name])

                      // configuration can still be null which is not mergable
                      if (template) {
                        ctx.config = deepMergeWithArrayOverwrite(base, ctx.config, template)
                      } else {
                        throw new Error(`Container "${ctx.containers[name].name}" does not have a valid template.`)
                      }
                    } catch (e) {
                      throw new Error(e)
                    }

                    task.title = 'Configuration generated.'
                  }
                }
              ]
            }
          })

          return task.newListr(
            subtasks.map((t) => {
              return this.cmd.tasks.indent(t.tasks, { rendererOptions: { collapse: true } }, { title: `Processing: ${t.name}` })
            }),
            {
              rendererOptions: { collapse: false }
            }
          )
        }
      }
    ])
  }

  public async getAvailableContainers (): Promise<AvailableContainers> {
    // some trickery to make it async
    return (
      await Promise.all(
        (
          await globby([ '**/docker-compose.yml(.j2)?' ], { cwd: this.dockerConfigLocation, absolute: true })
        ).map(async (item) => {
          const base = dirname(item)
          const name = relative(this.dockerConfigLocation, base)

          return {
            name,

            base,

            files: join(base, 'files'),

            path: item,

            dockerfile: await globby([ '**/Dockerfile(.j2)?', '**/dockerfile(.j2)?' ], {
              cwd: base,
              absolute: true,
              dot: true
            }),

            env: await globby([ '**/env.yml(.j2)?' ], {
              cwd: base,
              absolute: true,
              dot: true
            }),

            volumes: await globby([ '**/volumes.yml(.j2)?' ], {
              cwd: base,
              absolute: true,
              dot: true
            })
          }
        })
      )
    ).reduce((o, item) => ({ ...o, [item.name]: item }), {})
  }

  private async readYamlTemplate<T extends Record<string, any>>(path: string, context: any): Promise<T> {
    const rawTemplate = await this.readTemplate(path, context)
    this.cmd.logger.debug(`Parsing template "${path}":\n%s`, rawTemplate)

    return parseYaml<T>(rawTemplate)
  }

  private async readTemplate (path: string, context: any): Promise<string> {
    let template: string = await readRaw(path)

    // check if this is jinja
    if (extname(path) === '.j2') {
      template = jinja(path).renderString(template, context)
    }

    return template
  }

  private checkArrayIsExactlyOneInLength (array: any[]): boolean {
    // this is implemented to not handle more than file at the moment it is prune to change,
    // when multi-file handling which i think is unnecassary atm is required
    if (array.length === 1) {
      return true
    } else if (array.length > 1) {
      // maybe i will add multiple later, even though it is unnecassary?
      this.cmd.logger.fatal(`Error in configuration. There should be one file per container.\n${JSON.stringify(array, null, 2)}`)
      process.exit(1)
    } else {
      return false
    }
  }
}
