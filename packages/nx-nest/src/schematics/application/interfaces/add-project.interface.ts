import { RunBuilderOptions, TscBuilderOptions, TsNodeBuilderOptions } from '@webundsoehne/nx-builders'

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

  migration: {
    builder: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
    configurations?: Record<PropertyKey, Partial<RunBuilderOptions>>
  }

  command: {
    builder: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
  }

  seed: {
    builder: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
  }

  test: {
    builder: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
    configurations?: Record<PropertyKey, Partial<RunBuilderOptions>>
  }
}
