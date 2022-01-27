import { EmptyTree, SchematicContext, TaskExecutor } from '@angular-devkit/schematics'

import { RunWorkspaceCommandTaskOptions } from './run-workspace-command.interface'
import { runCommand } from '@schematics/package-script/lib/run-command'

export function runWorkspaceCommandExecutor (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _factoryOptions: RunWorkspaceCommandTaskOptions
): TaskExecutor<RunWorkspaceCommandTaskOptions> {
  return async (options: RunWorkspaceCommandTaskOptions, context: SchematicContext): Promise<void> => {
    await runCommand(options)(new EmptyTree(), context)
  }
}
