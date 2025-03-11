export interface LibraryGeneratorSchema {
  name: string
  jest: boolean
  skipPackageJson: boolean
  importPath?: string
  update: boolean
}
