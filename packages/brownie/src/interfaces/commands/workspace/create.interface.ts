import { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'

export class WorkspaceCreateCommandCtx {
  public prompts: {
    workspace?: string
  }
  public workspaces: WorkspaceConfig
  constructor () {
    this.prompts = {}
  }
}
