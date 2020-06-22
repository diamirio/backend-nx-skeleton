import { Linter } from '@nrwl/workspace'

export interface Schema {
  name: string
  dbController: 'none' | 'typeorm' | 'mongoose'
  tests: 'jest' | 'none'
  linter: Linter
  skipFormat: boolean
}