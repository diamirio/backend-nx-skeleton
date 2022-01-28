import { TaskConfiguration, TaskConfigurationGenerator } from '@angular-devkit/schematics'

import { RunPackageManagerTaskOptions, RUN_PACKAGE_MANAGER_TASK_NAME } from './run-package-manager.interface'

export class RunPackageManagerTask implements TaskConfigurationGenerator<RunPackageManagerTaskOptions> {
  constructor (private options: RunPackageManagerTaskOptions) {}

  public toConfiguration (): TaskConfiguration<RunPackageManagerTaskOptions> {
    return {
      name: RUN_PACKAGE_MANAGER_TASK_NAME,
      options: this.options
    }
  }
}
