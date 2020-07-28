import {
  ConfigBaseCommand,
  ConfigCommandChoices, ConfigRemove,
  ConfigTypes, createTable,
  parseYaml, promptUser,
  readRaw,
  writeFile,
  mergeObjects
} from '@cenk1cenk2/boilerplate-oclif'
import { flags } from '@oclif/command'
import fs from 'fs-extra'
import globby from 'globby'
import { dirname, extname, join, relative } from 'path'

import { AvailableContainers, DockerComposeFile, ParsedContainers } from '@context/docker/containers'
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
    })
  }

  static description = 'Create docker-compose configuration from boilerplates.'
  public choices: ConfigCommandChoices[] = [ ConfigCommandChoices.add, ConfigCommandChoices.show, ConfigCommandChoices.remove, ConfigCommandChoices.delete ]
  protected configName = 'docker-compose.yml'
  protected configType = ConfigTypes.localRoot
  private dockerConfigLocation: string = join(this.config.root, 'config', 'containers')

  async configAdd (config: DockerComposeFile): Promise<DockerComposeFile> {
    const { flags } = this.parse(DockerContainerCommand)

    // get available containers
    const availableContainers = await this.getAvailableContainers()

    if (availableContainers.length === 0) {
      this.logger.fatal(`No configuration files found in "${this.dockerConfigLocation}".`)
      process.exit(1)
    }

    const prompt = await promptUser<string[]>({
      type: 'MultiSelect',
      message: 'Please select which containers you want to add.',
      choices: availableContainers.map((item) => item.name)
    })

    // be sure that necassary folders are created
    await this.ensureDirectory(flags.output)

    // process containers
    await Promise.all(
      prompt.map(async (p) => {
        // select this container
        const container = availableContainers.find((item) => item.name === p)
        console.log(container)

        // create jinja context
        const context: Partial<ParsedContainers> = {
          name: container.name,
          path: container.path,
          flags: {
            output: flags.output
          }
        }

        // volumes parsing
        if (this.checkArrayIsExactlyOneInLength(container.volumes)) {
          // add this to context
          context.volumes = await this.readYamlTemplate(container.volumes.pop(), context)
        }

        // environment files parsing
        if (this.checkArrayIsExactlyOneInLength(container.env)) {
          // add this to context
          context.env = container.env

          // read the yaml template for one file
          const file = await this.readYamlTemplate(container.env.pop(), context)

          // parse environment variables
          const buffer = Object.entries(file).reduce((o, [ key, val ]) => {
            return [ ...o, `${key}=${val}` ]
          }, [])

          // output file
          const dir = join(flags.output, container.name)
          const env = join(dir, '.env')

          // create directory and files
          await this.ensureDirectory(dir)
          await writeFile(env, buffer)

          // add the information to locker
          await this.locker.lock({
            path: container.name, data: { dir, env }, merge: true
          })
        }

        // console.log(await this.readYamlTemplate(container.path, context))
        // add container to config a.k.a docker-compose file in this case
        config = mergeObjects(config, await this.readYamlTemplate(container.path, context), { array: 'overwrite' })
      })
    )

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
      removeFunction: async (config): Promise<DockerComposeFile> => config
    }
  }

  private async getAvailableContainers (): Promise<AvailableContainers[]> {
    return Promise.all(
      (await globby([ '**/docker-compose.yml(.j2)?' ], { cwd: this.dockerConfigLocation, absolute: true })).map(async (item) => {
        const dir = dirname(item)

        return {
          name: relative(this.dockerConfigLocation, dir),

          path: item,

          files: await globby([ '*', '.*', '!docker-compose.yml(.j2)?', '!env.yml(.j2)?', 'Dockerfile(.j2)?' ], {
            cwd: dir,
            absolute: true,
            dot: true
          }),

          env: await globby([ '**/env.yml(.j2)?' ], {
            cwd: dir,
            absolute: true,
            dot: true
          }),

          volumes: await globby([ '**/volumes.yml(.j2)?' ], {
            cwd: dir,
            absolute: true,
            dot: true
          }),

          dockerfile: await globby([ '**/Dockerfile(.j2)?' ], {
            cwd: dir,
            absolute: true,
            dot: true
          })
        }
      })
    )
  }

  private async readYamlTemplate<T extends Record<string, any>>(path: string, context: any): Promise<T> {
    let template: string
    template = await readRaw(path)

    if (extname(path) === '.j2') {
      template = jinja.bind(this)(path).renderString(template, context)
    }

    console.log(template)

    return parseYaml<T>(template)
  }

  private async ensureDirectory (path: string): Promise<void> {
    try {
      await fs.mkdirp(path)
    } catch (e) {
      this.logger.fatal(`Error while necessary folders: ${e}`)
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
