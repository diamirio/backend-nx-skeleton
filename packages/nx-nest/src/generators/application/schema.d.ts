import type { Component, Database } from '../../constant'

export interface ApplicationGeneratorSchema {
  name: string
  jest: boolean
  skipPackageJson: boolean
  components: Component[]
  database: Database
  microserviceProvider: boolean
  update: boolean
}
