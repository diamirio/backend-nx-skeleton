import { CommonNodeDependency } from '@interfaces/dependency.interface'

export interface NxSchematicsConfig extends CommonNodeDependency {
  description?: string
  schematics: SchematicConfig[]
}

export interface SchematicConfig {
  name: string
  description?: string
  forceArguments?: boolean
}
