import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { NodeModulesEngineHost } from '@angular-devkit/schematics/tools/node-module-engine-host'

import { RunWorkspaceCommandTaskOptions, RUN_WORKSPACE_COMMAND_TASK_NAME } from '@tasks/run-workspace-command'

/**
 * Creates a new project in the workspace.
 */
export function registerCustomTaskRunnersRule (): Rule {
  return (host: Tree, context: SchematicContext): Tree => {
    // eslint-disable-next-line no-underscore-dangle
    const privateHost = <NodeModulesEngineHost>(<any>context.engine)._host // this line is not supported

    privateHost.registerTaskExecutor<RunWorkspaceCommandTaskOptions>({
      name: RUN_WORKSPACE_COMMAND_TASK_NAME,
      create: (opt) => import('../tasks/run-workspace-command/run-workspace-command.executor').then((mod) => mod.runWorkspaceCommandExecutor(opt))
    })

    return host
  }
}
