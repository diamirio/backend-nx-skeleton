import { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'
import { LocalNodeModule, NodeDependency } from '@webundsoehne/nx-tools'

export class WorkspaceCreateCommandCtx {
  public prompts: {
    workspace?: string
  }
  public workspaces: WorkspaceConfig[]
  public deps: LocalNodeModule[]
  public packages: NodeDependency[]
  public workspace: WorkspaceConfig
  constructor () {
    this.prompts = {}
    this.packages = []
  }
}
