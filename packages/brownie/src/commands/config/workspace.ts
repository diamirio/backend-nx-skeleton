import { ConfigBaseCommand, promptUser, createTable, ConfigRemove, ConfigTypes } from '@cenk1cenk2/boilerplate-oclif'

import { WorkspacePrompt } from '@context/config/workspace.config.interface'
import { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'

export class WorkspaceConfigCommand extends ConfigBaseCommand {
  static description = 'Edit available workspace skeletons through a user interface.'
  protected configName = 'workspace.config.yml'
  protected configType = ConfigTypes.general

  public async configAdd (config: WorkspaceConfig[]): Promise<WorkspaceConfig[]> {
    // prompt user for details
    const response = await this.prompt(config)

    // userInput user if name already exists
    const index = config.findIndex((c) => c.pkg === response.pkg)
    if (index >= 0 && await promptUser({ type: 'Toggle', message: `"${response?.pkg}" already exists in local configuration. Do you want to overwrite?` })) {
      config[index] = response
    } else {
      config.push(response)
    }

    return config
  }

  public async configEdit (config: WorkspaceConfig[]): Promise<WorkspaceConfig[]> {
    // prompt user for which keys to edit
    const select = await promptUser({
      type: 'Select',
      message: 'Please select configuration to edit.',
      choices: config.map((c) => c.pkg)
    })

    const edit = await this.prompt(config, select)

    config.splice(
      config.findIndex((c) => c.pkg === select),
      1,
      edit
    )

    this.logger.success(`Edited "${select}" with "${edit.pkg}" in the local configuration.`)

    return config
  }

  public async configShow (config: WorkspaceConfig[]): Promise<void> {
    if (config.length > 0) {
      this.logger.info(
        createTable(
          [ 'Package', 'Registry' ],
          config.map((c) => [ c.pkg, c.registry ])
        )
      )
    } else {
      this.logger.warn('Configuration file is empty.')
    }

    this.logger.module('Configuration file is listed.')
  }

  public async configRemove (config: WorkspaceConfig[]): Promise<ConfigRemove<WorkspaceConfig[]>> {
    return {
      keys: config.map((c) => c.pkg),
      removeFunction: async (config, userInput): Promise<WorkspaceConfig[]> => {
        userInput.forEach((input) => {
          config = config.filter((c) => c.pkg !== input)
        })

        return config
      }
    }
  }

  protected validate (value: WorkspacePrompt): boolean | string {
    if (value.pkg === '') {
      return 'Package field can not be left empty.'
    }
    return true
  }

  protected result (value: WorkspacePrompt): WorkspacePrompt {
    if (!value.registry) {
      value.registry = 'https://registry.npmjs.org/'
    }

    return value
  }

  private prompt (config: WorkspaceConfig[], select?: string): Promise<WorkspacePrompt> {
    const matching = config.find((c) => c.pkg === select)

    return promptUser<WorkspacePrompt>({
      type: 'Form',
      message: 'Please provide the details for repository below.',
      choices: [
        {
          name: 'package',
          message: 'Package',
          initial: matching?.pkg ?? null
        },
        {
          name: 'registry',
          message: 'Registry',
          initial: matching?.registry ?? null
        }
      ],
      validate: (value) => this.validate(value),
      result: (value) => this.result(value)
    })
  }
}
