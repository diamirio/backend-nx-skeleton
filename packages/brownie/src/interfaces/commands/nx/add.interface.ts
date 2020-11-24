import { CheckIfModuleInstalled } from '@helpers/node.helper.interface'
import { SchematicConfig, NxSchematicsConfig } from '@interfaces/config/nx-schematics.config.interface'
import { CommonNodeDependency } from '@interfaces/dependency.interface'

export class NxAddCommandCtx {
  public prompts: {
    schematic?: NxSchematicsConfig
    toRunSchematic?: SchematicConfig
    arguments?: string
  }
  public deps: CheckIfModuleInstalled[]
  public packages: CommonNodeDependency[]
  constructor () {
    this.prompts = {}
    this.packages = []
  }
}
