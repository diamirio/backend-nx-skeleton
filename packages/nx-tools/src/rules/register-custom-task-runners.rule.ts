import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { NodeModulesEngineHost } from '@angular-devkit/schematics/tools/node-module-engine-host'

import { RunPackageManagerTaskOptions, RUN_PACKAGE_MANAGER_TASK_NAME } from '@tasks/run-package-manager'

/**
 * Creates a new project in the workspace.
 */
export function registerCustomTaskRunnersRule (): Rule {
  return (host: Tree, context: SchematicContext): Tree => {
    // eslint-disable-next-line no-underscore-dangle
    const privateHost = <NodeModulesEngineHost>(<any>context.engine)._host // this line is not supported

    privateHost.registerTaskExecutor<RunPackageManagerTaskOptions>({
      name: RUN_PACKAGE_MANAGER_TASK_NAME,
      create: (opt) => import('../tasks/run-package-manager/run-package-manager.executor').then((mod) => mod.runPackageManagerTaskExecutor(opt))
    })

    return host
  }
}
