import type { ExecutorOptions } from '@nx/js/src/utils/schema'

export interface TscExecutorSchema extends ExecutorOptions {
  cwd?: string
  mergeAssets?: boolean
}
