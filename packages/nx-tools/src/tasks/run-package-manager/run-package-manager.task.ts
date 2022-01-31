import type { TaskConfiguration, TaskConfigurationGenerator } from '@angular-devkit/schematics'

import type { RunPackageManagerTaskOptions } from './run-package-manager.interface'
import { RUN_PACKAGE_MANAGER_TASK_NAME } from './run-package-manager.interface'

export class RunPackageManagerTask implements TaskConfigurationGenerator<RunPackageManagerTaskOptions> {
  constructor (private options: RunPackageManagerTaskOptions) {}

  toConfiguration (): TaskConfiguration<RunPackageManagerTaskOptions> {
    return {
      name: RUN_PACKAGE_MANAGER_TASK_NAME,
      options: this.options
    }
  }
}
