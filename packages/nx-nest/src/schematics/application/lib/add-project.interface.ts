import { NodePackageBuilderOptions } from '@webundsoehne/nx-tsc'

export interface ProjectArchitect {
  [key: string]: any
  build: {
    builder: '@webundsoehne/nx-tsc:build'
    options: NodePackageBuilderOptions
  }
}