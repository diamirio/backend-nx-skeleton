import {
  ConfigBaseCommand,
  ConfigCommandChoices, ConfigRemove,
  ConfigTypes, createTable,
  parseYaml, promptUser,
  readRaw,
  writeFile,
  mergeObjects,
  createDirIfNotExists,
  promptOverwrite,
  tasksOverwritePrompt
} from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import { formatFiles } from '@webundsoehne/nx-tools'
import fs from 'fs-extra'
import globby from 'globby'
import { Listr, ListrClass, ListrTask, ListrDefaultRenderer } from 'listr2'
import { dirname, extname, join, relative } from 'path'

import { AvailableContainers, DockerComposeFile, ParsedContainers, DockerContainerAddCtx } from '@context/docker/containers'
import { jinja }from '@helpers/jinja.helper'

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
    })
  }

  static description = 'Create docker-compose configuration from boilerplates.'
  public choices: ConfigCommandChoices[] = [ ConfigCommandChoices.add, ConfigCommandChoices.show, ConfigCommandChoices.remove, ConfigCommandChoices.delete ]
  protected configName = 'docker-compose.yml'
  protected configType = ConfigTypes.localRoot
  private dockerConfigLocation: string = join(this.config.root, 'config', 'containers')

  async configAdd (config: DockerComposeFile): Promise<DockerComposeFile> {
    const { flags } = this.parse(DockerContainerCommand)

    this.tasks.add<DockerContainerAddCtx>([
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
          throw new Error(`No configuration files found in "${this.dockerConfigLocation}".`)
        }
      },

      // get user prompts
      {
        task: async (ctx, task): Promise<string[]> => ctx.prompt = await task.prompt<string[]>({
          type: 'MultiSelect',
          message: 'Please select which containers you want to add.',
          choices: Object.keys(ctx.containers)
        })
      },

      // be sure that necassary folders are created
      {
        title: 'Creating output directory.',
        task: async (): Promise<void> => await createDirIfNotExists(flags.output)
      },

      // find selected container
      {
        title: 'Processing containers.',
        task: (ctx, task): Listr => {
          // initialize variables
          ctx.context = {}
          const containerTasks = ctx.prompt.map((name): { name: string, tasks: ListrTask<DockerContainerAddCtx, ListrDefaultRenderer>[]} => {
            return {
              name: ctx.containers[name].name,
              tasks: [
                {
                  title: 'Initiating...',
                  task: (ctx, task): void => {
                    // create jinja context
                    ctx.context[name] = {
                      name: ctx.containers[name].name,
                      dir: join(flags.output, ctx.containers[name].name),
                      path: ctx.containers[name].path,
                      output: flags.output
                    }

                    // lock necassary information
                    this.locker.add({
                      path: ctx.containers[name].name, data: { output: flags.output, dir: ctx.context[name].dir }, merge: true
                    })

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
                      if (!flags.force) {
                        await tasksOverwritePrompt(output, task, false)
                      }
                    } catch (e) {
                      this.message.warn(`Skipping: ${e}`)
                    }

                    // create directory and files
                    await createDirIfNotExists(ctx.context[name].dir)

                    // write to file
                    await writeFile(output, await readRaw(ctx.context[name].dockerfile))

                    // add the information to locker, immediately
                    await this.locker.lock({
                      path: ctx.containers[name].name, data: { dockerfile: output }, merge: true
                    })

                    task.title = 'Environment files generated.'
                  }
                },

                {
                  title: 'Processing volumes...',
                  skip: (): boolean => !this.checkArrayIsExactlyOneInLength(ctx.containers[name]?.volumes),
                  task: async (ctx, task): Promise<void> => {
                    ctx.context[name].volumes = await this.readYamlTemplate(ctx.containers[name].volumes[0], ctx.context[name])

                    // process all volumes async
                    await Promise.all(ctx.context[name].volumes.map(async (volume) => {
                      // create asset
                      const asset = {
                        from: join(ctx.containers[name].files, volume.from),
                        to: join(ctx.context[name].dir, 'volumes')
                      }

                      if (volume.mode === 'file') {
                        // if this is a file copy it directly
                        this.message.debug(`Copying file: ${asset.from} -> ${asset.to}`)

                        try {
                          await fs.copyFile(asset.from, asset.to)
                        } catch (e) {
                          this.message.fail(`Error while copying asset: ${e}`)

                          // just delete this from the list
                          ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)
                        }

                      } else if (volume.mode === 'dir') {
                        // if this is a directory we have to create the directory seperately and copy files in them, because of how fs works in node
                        this.message.debug(`Copying directory: ${asset.from} -> ${asset.to}`)

                        try {
                          await createDirIfNotExists(join(asset.to, volume.from))
                          await fs.copy(asset.from, join(asset.to, volume.from))

                        } catch (e) {
                          this.message.fail(`Error while copying folder: ${e}`)

                          // just delete this from the list
                          ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)

                        }
                      } else if (volume.mode === 'volume') {
                        // we can add persistent volumes if you want to keep data
                        let prompt: boolean

                        // only asks this with this flag
                        if (flags.volume) {
                          prompt = await task.prompt({
                            type: 'Toggle', message: `Do you want to add persistent volume for the container at "${volume.to}"?`, initial: true
                          })
                        }

                        // it will clear out this entry
                        if (!prompt) {
                          ctx.context[name].volumes = ctx.context[name].volumes.filter((item) => item !== volume)
                        }

                      } else {
                        throw new Error('Unknown volume mode this may be do to templating error.')
                      }

                    }))

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
                      if (!flags.force) {
                        await tasksOverwritePrompt(output, task, false)
                      }
                    } catch (e) {
                      this.message.warn(`Skipping: ${e}`)
                    }

                    // read the yaml template for one file
                    const file = await this.readYamlTemplate(ctx.context[name].env, ctx.context[name])

                    // parse environment variables, this is more reasonable than jinja
                    const buffer = Object.entries(file).reduce((o, [ key, val ]) => {
                      return [ ...o, `${key}=${val}` ]
                    }, [])

                    // create directory and files
                    await createDirIfNotExists(ctx.context[name].dir)

                    // write to file
                    await writeFile(output, buffer)

                    // add the information to locker, immediately
                    await this.locker.lock({
                      path: ctx.containers[name].name, data: { env: output }, merge: true
                    })

                    task.title = 'Environment files generated.'
                  }
                },

                // creating configuration
                {
                  title: 'Creating configuration.',
                  task: async (ctx, task): Promise<void> => {
                    try {
                      this.logger.debug(`Context for "${ctx.containers[name].path}":\n%o`, ctx.context[name])

                      // read the template
                      const template = await this.readYamlTemplate(ctx.containers[name].path, ctx.context[name])

                      // configuration can still be null which is not mergable
                      if (template) {
                        config = mergeObjects(config, template, { array: 'overwrite' })
                      } else {
                        throw new Error(`Container "${ctx.containers[name]}" does not have a valid template.`)
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
            containerTasks.map((containerTask) => {
              return this.tasks.indent(containerTask.tasks, { rendererOptions: { collapse: false } }, { title: `Processing: ${containerTask.name}` })
            }),
            {
              rendererOptions: { collapse: false }
            })
        }
      }
    ])

    // run all the tasks
    await this.runTasks()

    // lock all in queue
    await this.locker.lockAll()

    return config
  }

  async configEdit (): Promise<null> {
    return
  }

  async configShow (config: DockerComposeFile): Promise<void> {
    if (Object.keys(config).length > 0) {
      this.logger.info(
        createTable(
          [ 'Container', 'Details' ],
          [ [ '', '' ] ]
          // config.map((val, i) => [ Object.keys(config)[i], val ])
        )
      )
    } else {
      this.logger.warn('Configuration file is empty.')
    }

    this.logger.module('Configuration file is listed.')
  }

  async configRemove (config: DockerComposeFile): Promise<ConfigRemove<DockerComposeFile>> {
    return {
      keys: [],
      removeFunction: async (config, input): Promise<DockerComposeFile> => config
    }
  }

  private async getAvailableContainers (): Promise<AvailableContainers> {
    // some trickery to make it async
    return (await Promise.all(
      (await globby([ '**/docker-compose.yml(.j2)?' ], { cwd: this.dockerConfigLocation, absolute: true })).map(async (item) => {
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
    )).reduce((o, item) => ({ ...o, [item.name]: item }), {})

  }

  private async readYamlTemplate<T extends Record<string, any>>(path: string, context: any): Promise<T> {
    let template: string
    template = await readRaw(path)

    // check if this is jinja
    if (extname(path) === '.j2') {
      template = jinja.bind(this)(path).renderString(template, context)
    }

    try {
      const parsedTemplate = parseYaml<T>(template)

      return parsedTemplate
    } catch (e) {
      this.logger.debug(`"${path}" does not seem like a valid template file.`)
      this.logger.debug(JSON.stringify(template, null, 2))
      throw e
    }
  }

  private checkArrayIsExactlyOneInLength (array: any[]): boolean {
    // this is implemented to not handle more than file at the moment it is prune to change,
    // when multi-file handling which i think is unnecassary atm is required
    if (array.length === 1) {
      return true
    } else if (array.length > 1) {
      // maybe i will add multiple later, even though it is unnecassary?
      this.logger.fatal(`Error in configuration. There should be one file per container.\n${JSON.stringify(array, null, 2)}`)
      process.exit(1)
    } else {
      return false
    }
  }
}
