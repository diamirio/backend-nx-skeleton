import { SchematicConfig, NxSchematicsConfig } from '@interfaces/config/nx-schematics.config.interface'
import { CheckIfModuleInstalled, CommonNodeDependency } from '@webundsoehne/nx-tools'

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
