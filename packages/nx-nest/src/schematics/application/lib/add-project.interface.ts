import { NodePackageBuilderOptions, NodePackageServeOptions } from '@webundsoehne/nx-builders'

export interface ProjectArchitect {
  [key: string]: any
  build: {
    builder: '@webundsoehne/nx-builders:tsc'
    options: NodePackageBuilderOptions
  }

  serve: {
    builder: '@webundsoehne/nx-builders:ts-node-dev'
    options: NodePackageServeOptions
  }

  bgtask: {
    builder: '@webundsoehne/nx-builders:ts-node-dev'
    options: NodePackageServeOptions
  }
}