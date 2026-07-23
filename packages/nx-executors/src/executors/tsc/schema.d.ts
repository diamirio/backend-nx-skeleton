import type { ExecutorOptions } from '@nx/js/dist/src/utils/schema'

export interface TscExecutorSchema extends ExecutorOptions {
  cwd?: string
  mergeAssets?: boolean
  keepPackageVersion: boolean
}
