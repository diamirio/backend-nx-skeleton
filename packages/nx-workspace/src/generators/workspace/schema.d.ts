export interface WorkspaceGeneratorSchema {
  name: string
  scope: string
  layout: string
  skipPackageJson?: boolean
  force?: boolean
}
