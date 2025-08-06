import type { Component } from '../../constant'

export interface ApplicationGeneratorSchema {
  name: string
  jest: boolean
  skipPackageJson: boolean
  components: Component[]
  database: boolean
  microserviceProvider: boolean
  update: boolean
}
