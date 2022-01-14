import { Tree } from '@nrwl/devkit'

import { BackendInterfacesIntegration } from './backend-interfaces.interface'
import { NxNestProjectIntegration } from './integration.interface'
import { readWorkspaceProjects } from '@webundsoehne/nx-tools'

/**
 * Reads the backend interface integration part of the nx.json.
 */
export function readBackendInterfaceIntegration (host: Tree): BackendInterfacesIntegration[] {
  const projects = readWorkspaceProjects<NxNestProjectIntegration>(host)

  return Object.entries(projects).reduce((o, [ key, value ]) => {
    if (value.integration?.nestjs?.dbAdapters) {
      o = [
        ...o,
        {
          name: key,
          root: value.root,
          sourceRoot: value.sourceRoot,
          dbAdapters: value.integration.nestjs.dbAdapters
        }
      ]
    }

    return o
  }, [])
}
