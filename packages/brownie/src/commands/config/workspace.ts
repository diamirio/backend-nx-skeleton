import { ConfigBaseCommand, promptUser, createTable, ConfigRemove, ConfigTypes } from '@cenk1cenk2/boilerplate-oclif'

import { WorkspacePrompt } from '@context/config/workspace.config.interface'
import { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'

export class WorkspaceConfigCommand extends ConfigBaseCommand {
  static description = 'Edit available workspace skeletons through a user interface.'
  protected configName = 'workspace.config.yml'
  protected configType = ConfigTypes.general

  async configAdd (config: WorkspaceConfig): Promise<WorkspaceConfig> {
    // prompt user for details
    const response = await this.prompt(config)

    // userInput user if name already exists
    const index = config.findIndex((c) => c.package === response.package)
    if (index >= 0 && await promptUser({ type: 'Toggle', message: `"${response?.package}" already exists in local configuration. Do you want to overwrite?` })) {
      config[index] = response
    } else {
      config.push(response)
    }

    return config
  }

  async configEdit (config: WorkspaceConfig): Promise<WorkspaceConfig> {
    // prompt user for which keys to edit
    const select = await promptUser({
      type: 'Select',
      message: 'Please select configuration to edit.',
      choices: config.map((c) => c.package)
    })

    const edit = await this.prompt(config, select)

    config.splice(
      config.findIndex((c) => c.package === select),
      1,
      edit
    )

    this.logger.success(`Edited "${select}" with "${edit.package}" in the local configuration.`)

    return config
  }

  async configShow (config: WorkspaceConfig): Promise<void> {
    if (config.length > 0) {
      this.logger.info(
        createTable(
          [ 'Package' ],
          config.map((c) => [ c.package ])
        )
      )
    } else {
      this.logger.warn('Configuration file is empty.')
    }

    this.logger.module('Configuration file is listed.')
  }

  async configRemove (config: WorkspaceConfig): Promise<ConfigRemove<WorkspaceConfig>> {
    return {
      keys: config.map((c) => c.package),
      removeFunction: async (config, userInput): Promise<WorkspaceConfig> => {
        userInput.forEach((input) => {
          config = config.filter((c) => c.package !== input)
        })

        return config
      }
    }
  }

  protected validate (value: WorkspacePrompt): boolean | string {
    if (value.package === '') {
      return 'Package field can not be left empty.'
    }
    return true
  }

  protected result (value: WorkspacePrompt): WorkspacePrompt {
    return value
  }

  private prompt (config: WorkspaceConfig, select?: string): Promise<WorkspacePrompt> {
    return promptUser<WorkspacePrompt>({
      type: 'Form',
      message: 'Please provide the details for repository below.',
      choices: [
        {
          name: 'package',
          message: 'Package',
          initial: select ?? config[select]
        }
      ],
      validate: (value) => this.validate(value),
      result: (value) => this.result(value)
    })
  }
}
