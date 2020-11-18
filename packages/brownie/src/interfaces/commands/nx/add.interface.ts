import { CheckIfModuleInstalled } from '@helpers/node.helper.interface'
import { WorkspaceConfig } from '@interfaces/config/workspace.config.interface'

export class NxAddCommandCtx {
  public prompts: {
    schematic?: string
  }
  public deps: CheckIfModuleInstalled[]
  public packages: string[]
  constructor () {
    this.prompts = {}
    this.packages = []
  }
}
