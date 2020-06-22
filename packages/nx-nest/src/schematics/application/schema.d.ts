import { Path } from '@angular-devkit/core'
import { Linter } from '@nrwl/workspace'

export interface Schema {
  name: string
  directory: string
  dbController: 'none' | 'typeorm' | 'mongoose'
  tests: 'jest' | 'none'
  linter: Linter
  skipFormat: boolean
}

export interface NormalizedSchema extends Schema {
  projectName: string
  appProjectRoot: Path
  skipFormat: boolean
}