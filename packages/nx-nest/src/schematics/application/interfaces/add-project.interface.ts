import { TscBuilderOptions, TsNodeBuilderOptions } from '@webundsoehne/nx-builders'

/**
 * Interface setting builder settings
 */
export interface SchematicArchitect {
  [key: string]: any
  build: {
    builder: '@webundsoehne/nx-builders:tsc'
    options: TscBuilderOptions
  }

  serve: {
    builder: '@webundsoehne/nx-builders:ts-node-dev'
    options: TsNodeBuilderOptions
  }

  bgtask: {
    builder: '@webundsoehne/nx-builders:ts-node-dev'
    options: TsNodeBuilderOptions
  }
}
