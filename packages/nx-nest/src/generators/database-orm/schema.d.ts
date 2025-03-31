import type { Database, DatabaseOrm } from '../../constant'

export interface DatabaseOrmGeneratorSchema {
  databaseOrm: DatabaseOrm
  database?: Database
  name: string
  importPath?: string
  skipPackageJson: boolean
  update?: boolean
  updateApplications?: string[]
}
