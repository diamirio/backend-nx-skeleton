import type { CommonNodeDependency } from '@webundsoehne/nx-tools'

export interface NxSchematicsConfig extends CommonNodeDependency {
  description?: string
  schematics: SchematicConfig[]
}

export interface SchematicConfig {
  name: string
  description?: string
  forceArguments?: boolean
}
