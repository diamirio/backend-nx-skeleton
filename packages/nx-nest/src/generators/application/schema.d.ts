import type { Component, Database, DatabaseOrm } from '../../constant'

export interface ApplicationGeneratorSchema {
  name: string
  jest: boolean
  skipPackageJson: boolean
  components: Component[]
  databaseOrm: DatabaseOrm
  database?: Database
  microserviceProvider: boolean
  update: boolean
}
