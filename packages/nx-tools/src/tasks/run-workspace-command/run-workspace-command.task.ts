import { TaskConfiguration, TaskConfigurationGenerator } from '@angular-devkit/schematics'

import { RunWorkspaceCommandTaskOptions, RUN_WORKSPACE_COMMAND_TASK_NAME } from './run-workspace-command.interface'

export class RunWorkspaceCommandTask implements TaskConfigurationGenerator<RunWorkspaceCommandTaskOptions> {
  constructor (private options: RunWorkspaceCommandTaskOptions) {}

  public toConfiguration (): TaskConfiguration<RunWorkspaceCommandTaskOptions> {
    return {
      name: RUN_WORKSPACE_COMMAND_TASK_NAME,
      options: this.options
    }
  }
}
