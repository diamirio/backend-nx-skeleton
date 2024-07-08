export interface DatabaseOrmGeneratorSchema {
  database: string
  name: string
  importPath?: string
  skipPackageJson: boolean
}
