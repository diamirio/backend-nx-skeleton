import type { RunBuilderOptions, TscBuilderOptions, TsNodeBuilderOptions } from '@webundsoehne/nx-builders'

/**
 * Interface setting builder settings
 */
export interface SchematicTargets {
  [key: string]: any

  build: {
    executor: '@webundsoehne/nx-builders:tsc'
    options: TscBuilderOptions
  }

  serve: {
    executor: '@webundsoehne/nx-builders:ts-node-dev'
    options: TsNodeBuilderOptions
  }

  bgtask?: {
    executor: '@webundsoehne/nx-builders:ts-node-dev'
    options: TsNodeBuilderOptions
  }

  migration?: {
    executor: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
    configurations?: Record<PropertyKey, Partial<RunBuilderOptions>>
  }

  command?: {
    executor: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
  }

  seed?: {
    executor: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
  }

  test?: {
    executor: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
    configurations?: Record<PropertyKey, Partial<RunBuilderOptions>>
  }
}
