import type { JestExecutorOptions } from '@nx/jest/src/executors/jest/schema'

export interface JestExecutorSchema extends JestExecutorOptions {
  cwd?: string
  coverage?: boolean
  env?: Record<string, any>
  environment?: Record<string, any>
}
