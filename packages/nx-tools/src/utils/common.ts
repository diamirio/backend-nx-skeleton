import { BuilderContext } from '@angular-devkit/architect'
import { workspaces } from '@angular-devkit/core'

export async function getWorkspace (context: BuilderContext, host): Promise<workspaces.WorkspaceDefinition> {
  const workspaceHost = workspaces.createWorkspaceHost(host)
  const { workspace } = await workspaces.readWorkspace(
    context.workspaceRoot,
    workspaceHost
  )

  return workspace
}
