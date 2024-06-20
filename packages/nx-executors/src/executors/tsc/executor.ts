import type { ExecutorContext } from '@nx/devkit'
import { tscExecutor as nxTscExecutor } from '@nx/js/src/executors/tsc/tsc.impl'
import type { ExecutorOptions } from '@nx/js/src/utils/schema'
import { join } from 'node:path'

import type { ExecutorResult } from '../inteface'

export default async function (options: ExecutorOptions & { cwd?: string }, context: ExecutorContext): Promise<ExecutorResult> {
  const project = context.projectsConfigurations.projects[context.projectName]
  const cwd = options?.cwd ?? project.root

  options.rootDir = options.rootDir ?? './'
  options.outputPath = options.outputPath ?? `dist/${context.projectName}`
  options.main = options.main.startsWith(cwd) ? options.main : join(cwd, options.main)
  options.tsConfig = options.tsConfig.startsWith(cwd) ? options.tsConfig : join(cwd, options.tsConfig)

  for await (const data of nxTscExecutor(options, context)) {
    if (!data.success) {
      throw new Error(`Error compiling: ${data.outfile}`)
    }
  }

  return { success: true }
}
