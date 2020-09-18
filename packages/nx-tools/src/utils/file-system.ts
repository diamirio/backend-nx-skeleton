import { BuilderContext } from '@angular-devkit/architect'
import { workspaces } from '@angular-devkit/core'
import { fs } from '@angular-devkit/core/node'

export async function getWorkspace (context: BuilderContext, host): Promise<workspaces.WorkspaceDefinition> {
  const workspaceHost = workspaces.createWorkspaceHost(host)
  const { workspace } = await workspaces.readWorkspace(context.workspaceRoot, workspaceHost)

  return workspace
}

export function checkNodeModulesExists (paths: Record<string, string>): void {
  Object.entries(paths).forEach(([ key, value ]) => {
    if (!fs.isFile(value)) {
      throw new Error(`File not found: "${key}"@"${value}"`)
    }
  })
}