import type { RunCommandsOptions } from 'nx/src/executors/run-commands/run-commands.impl'

export interface RunExecutorSchema extends RunCommandsOptions {
  tsNode: boolean
  nodeOptions: string | string[]
}
