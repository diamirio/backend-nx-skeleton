import { CheckIfModuleInstalled } from '@helpers/node.helper.interface'
import { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'

export class WorkspaceCreateCommandCtx {
  public prompts: {
    workspace?: string
  }
  public workspaces: WorkspaceConfig[]
  public deps: CheckIfModuleInstalled[]
  public installDeps: string[]
  constructor () {
    this.prompts = {}
    this.installDeps = []
  }
}
