import { ConfigBaseCommand, ConfigRemove, createTable, promptUser, ConfigTypes } from '@cenk1cenk2/boilerplate-oclif'

import { NxLibrariesConfig } from '@context/config/nx-libs.config.interface'

export class NxLibrariesCommand extends ConfigBaseCommand {
  static description = 'Edit available NX packages through a user interface.'
  protected configName = 'nx-libs.config.yml'
  protected configType = ConfigTypes.general

  async configAdd (config: NxLibrariesConfig): Promise<NxLibrariesConfig> {
    // prompt user for details
    const response = await promptUser({
      type: 'Form',
      message: 'Please provide the details for NX package below.',
      choices: [
        { name: 'package', message: 'Package' },
        { name: 'name', message: 'Name' },
        { name: 'description', message: 'Description' }
      ],
      validate: (value) => this.validate(value),
      result: (value) => this.result(value)
    })

    // userInput user if name already exists
    let overwritePrompt = true
    if (config?.some((val) => val.package === response.package)) {
      overwritePrompt = await promptUser({ type: 'Toggle', message: `"${response?.name}" already exists in local configuration. Do you want to overwrite?` })
    }

    if (overwritePrompt) {
      config[response?.name] = response.value
      this.logger.success(`Added "${response.name}" to the local configuration.`)
    }

    return config
  }

  async configEdit (config: NxLibrariesConfig): Promise<NxLibrariesConfig> {
    // prompt user for which keys to edit
    const select = await promptUser({
      type: 'Select',
      message: 'Please select configuration to edit.',
      choices: Object.keys(config)
    })

    const edit = await promptUser({
      type: 'Form',
      message: 'Please provide the details for repository below.',
      choices: [
        {
          name: 'value',
          message: 'Repository',
          initial: config[select]
        },
        {
          name: 'name',
          message: 'Name',
          initial: select
        }
      ],
      validate: (value) => this.validate(value),
      result: (value) => this.result(value)
    })

    // strip old item
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { [select]: omit, ...rest } = config

    // write to temp
    rest[edit.name] = edit.value
    this.logger.success(`Edited "${select}" with "${edit.name}@${edit.value}" in the local configuration.`)

    // FIXME
    return config
  }

  async configShow (config: NxLibrariesConfig): Promise<void> {
    if (Object.keys(config).length > 0) {
      this.logger.info(
        createTable(
          [ 'Package', 'Name', 'Description' ],
          config.map((val) => [ val.package, val.name, val.description ])
        )
      )
    } else {
      this.logger.warn('Configuration file is empty.')
    }

    this.logger.module('Configuration file is listed.')
  }

  async configRemove (config: NxLibrariesConfig): Promise<ConfigRemove<NxLibrariesConfig>> {
    // @TODO
    return {
      keys: Object.keys(config),
      removeFunction: async (config): Promise<NxLibrariesConfig> => config
    }
  }

  protected validate (value): boolean | string {
    if (value.value === '') {
      return 'Repository field can not be left empty.'
    }
    return true
  }

  protected result (value): { name: string, value: string } {
    if (value.name === '') {
      value.name = value.value?.split('/').pop()
      this.logger.warn(`Name was empty for "${value.value}", initiated it as "${value.name}".`)
    }
    return value
  }
}
