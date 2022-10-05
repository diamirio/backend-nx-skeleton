import type { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'
import type { LocalNodeModule, NodeDependency } from '@webundsoehne/nx-tools'

export class WorkspaceCreateCommandCtx {
  public prompts: {
    workspace?: string
  }
  public workspaces: WorkspaceConfig[]
  public dependencies: NodeDependency[]
  public deps: LocalNodeModule[]
  public packages: NodeDependency[]
  public workspace: WorkspaceConfig

  constructor () {
    this.prompts = {}
    this.packages = []
  }
}
