import { Path } from '@angular-devkit/core'
import { Linter } from '@nrwl/workspace'

// this is the one gets inputted from the command line
export interface Schema {
  name: string
  packageName: string
  directory: string
  server: string
  microservice: string
  database: string
  components: string[]
  tests: string
  linter: string
  skipFormat: boolean
}

export type AvailableComponents = 'server' | 'command' | 'bgtask' | 'microservice-client' | 'microservice-server'
export type AvailableServerTypes = 'graphql' | 'restful'
export type AvailableMicroserviceTypes = 'rabbitmq'
export type AvailableDBTypes = 'none' | 'typeorm-mysql' | 'typeorm-postgresql' | 'mongoose-mongodb'
export type AvailableTestsTypes = 'jest' | 'none'
export type AvailableLinterTypes = Linter

export interface NormalizedSchema {
  name: string
  root: Path
  sourceRoot: Path
  directory: string
  packageName: string
  linter: AvailableLinterTypes
  skipFormat: boolean
  components: AvailableComponents[]
  server: AvailableServerTypes
  microservice: AvailableMicroserviceTypes
  database: AvailableDBTypes
  tests: AvailableTestsTypes
  priorConfiguration: {
    components: AvailableComponents[]
    server: AvailableServerTypes
    microservice: AvailableMicroserviceTypes
    database: AvailableDBTypes
    tests: AvailableTestsTypes
  }
}
