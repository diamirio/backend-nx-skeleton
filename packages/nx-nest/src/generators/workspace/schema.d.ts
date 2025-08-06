export interface NestWorkspaceGeneratorSchema {
  name: string
  scope: string
  database: boolean
  microserviceProvider: boolean
  skipPackageJson: boolean
  force: boolean
}
