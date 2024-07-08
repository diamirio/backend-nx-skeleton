import type { Database } from '../../constant'
import type { Component } from '../../constant/application'

export interface ApplicationGeneratorSchema {
  name: string
  jest: boolean
  skipPackageJson: boolean
  components: Component[]
  database: Database
  microserviceProvider: boolean
  update: boolean
}
