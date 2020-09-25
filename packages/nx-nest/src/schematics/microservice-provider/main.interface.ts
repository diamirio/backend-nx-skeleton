import { Path } from '@angular-devkit/core'
import { Linter } from '@nrwl/workspace'

// this is the one gets inputted from the command line
export interface Schema {
  name: string
  packageName: string
  directory: string
  server: string
  database: string
  components: string
  tests: string
  linter: string
  skipFormat: boolean
  verbose: boolean
}

export type AvailableComponents = 'server' | 'command' | 'bgtask' | 'microservice'
export type AvailableServerTypes = 'graphql' | 'restful'
export type AvailableDBTypes = 'none' | 'typeorm-mysql' | 'typeorm-postgresql' | 'mongoose-mongodb'
export type AvailableTestsTypes = 'jest' | 'none'
export type AvailableLinterTypes = Linter

export interface NormalizedSchema {
  name: string
  packageName: string
  root: Path
  directory: string
  components: AvailableComponents[]
  server: AvailableServerTypes
  database: AvailableDBTypes
  tests: AvailableTestsTypes
  linter: AvailableLinterTypes
  skipFormat: boolean
  priorConfiguration: {
    components: AvailableComponents[]
    server: AvailableServerTypes
    database: AvailableDBTypes
    tests: AvailableTestsTypes
  }
}
