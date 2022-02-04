import type { RunBuilderOptions, TscBuilderOptions } from '@webundsoehne/nx-builders'

/**
 * Interface setting builder settings
 */
export interface SchematicTargets {
  [key: string]: any

  build?: {
    executor: '@webundsoehne/nx-builders:tsc'
    options: TscBuilderOptions
  }

  serve?: {
    executor: '@webundsoehne/nx-builders:tsc'
    options: TscBuilderOptions
  }

  test?: {
    executor: '@webundsoehne/nx-builders:run'
    options: Partial<RunBuilderOptions>
    configurations?: Record<PropertyKey, Partial<RunBuilderOptions>>
  }
}
