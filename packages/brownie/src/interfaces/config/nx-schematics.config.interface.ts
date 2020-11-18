export interface NxSchematicsConfig {
  package: string
  registry?: string
  description?: string
  schematics: {
    name: string
    description?: string
  }[]
}
