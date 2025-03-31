export interface MicroserviceProviderGeneratorSchema {
  name: string
  importPath?: string
  skipPackageJson: boolean
  updateApplications?: string[]
}
