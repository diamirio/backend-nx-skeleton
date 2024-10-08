import type { Database, DatabaseOrm } from '../../constant'

export interface NestWorkspaceGeneratorSchema {
  name: string
  scope: string
  databaseOrm: DatabaseOrm
  database?: Database
  microserviceProvider: boolean
  skipPackageJson: boolean
  force: boolean
}
