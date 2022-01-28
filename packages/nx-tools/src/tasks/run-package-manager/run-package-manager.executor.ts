import { EmptyTree, SchematicContext, TaskExecutor } from '@angular-devkit/schematics'

import { RunPackageManagerTaskOptions } from './run-package-manager.interface'
import { runCommand } from '@schematics/package-manager/lib/run-command'

export function runPackageManagerTaskExecutor (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _factoryOptions: RunPackageManagerTaskOptions
): TaskExecutor<RunPackageManagerTaskOptions> {
  return async (options: RunPackageManagerTaskOptions, context: SchematicContext): Promise<void> => {
    await runCommand(options)(new EmptyTree(), context)
  }
}
