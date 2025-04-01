import type { Database, DatabaseOrm } from '../../constant'

export interface DatabaseOrmGeneratorSchema {
  orm?: DatabaseOrm
  database?: Database
  name: string
  importPath?: string
  skipPackageJson: boolean
  update?: boolean
  updateApplications?: string[]
}
