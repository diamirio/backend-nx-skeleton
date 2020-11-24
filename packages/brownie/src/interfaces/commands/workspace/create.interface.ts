import { CheckIfModuleInstalled } from '@helpers/node.helper.interface'
import { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'
import { NodeDependency } from '@interfaces/dependency.interface'

export class WorkspaceCreateCommandCtx {
  public prompts: {
    workspace?: string
  }
  public workspaces: WorkspaceConfig[]
  public deps: CheckIfModuleInstalled[]
  public packages: NodeDependency[]
  public workspace: WorkspaceConfig
  constructor () {
    this.prompts = {}
    this.packages = []
  }
}
