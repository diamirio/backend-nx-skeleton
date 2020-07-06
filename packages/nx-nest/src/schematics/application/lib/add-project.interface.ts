import { NodePackageBuilderOptions } from '@webundsoehne/nx-builders'

export interface ProjectArchitect {
  [key: string]: any
  build: {
    builder: '@webundsoehne/nx-builders:tsc'
    options: NodePackageBuilderOptions
  }
}