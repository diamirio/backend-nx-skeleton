import { Path } from '@angular-devkit/core'
import { Linter } from '@nrwl/workspace'

// this is the one gets inputted from the command line
export interface Schema {
  name: string
  microservices: string
  linter: string
  skipFormat: boolean
  verbose: boolean
}

export type AvailableLinterTypes = Linter

export interface NormalizedSchema {
  name: string
  packageName: string
  root: Path
  directory: string
  microservices: string[]
  parsedMicroservices: ParsedMicroservices[]
  linter: AvailableLinterTypes
  skipFormat: boolean
  priorConfiguration: {
    microservices: string[]
  }
}

export interface ParsedMicroservices {
  name: string
  names: {
    pattern: string
  }
  casing: {
    kebab: string
  }
}
