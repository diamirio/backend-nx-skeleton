import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import type { NodeModulesEngineHost } from '@angular-devkit/schematics/tools/node-module-engine-host'

import type { RunPackageManagerTaskOptions } from '@tasks/run-package-manager'
import { RUN_PACKAGE_MANAGER_TASK_NAME } from '@tasks/run-package-manager'

/**
 * Creates a new project in the workspace.
 */
export function registerCustomTaskRunnersRule (): Rule {
  return (host: Tree, context: SchematicContext): Tree => {
    // eslint-disable-next-line no-underscore-dangle
    const privateHost = (context.engine as any)._host as NodeModulesEngineHost // this line is not supported

    privateHost.registerTaskExecutor<RunPackageManagerTaskOptions>({
      name: RUN_PACKAGE_MANAGER_TASK_NAME,
      create: (opt) => import('../tasks/run-package-manager/run-package-manager.executor').then((mod) => mod.runPackageManagerTaskExecutor(opt))
    })

    return host
  }
}
