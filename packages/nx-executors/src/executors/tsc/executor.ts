import type { ExecutorContext } from '@nx/devkit'
import { tscExecutor as nxTscExecutor } from '@nx/js/src/executors/tsc/tsc.impl'
import { join } from 'node:path'

import type { ExecutorResult } from '../inteface'
import type { TscExecutorSchema } from './schema'

export default async function (options: TscExecutorSchema, context: ExecutorContext): Promise<ExecutorResult> {
  const project = context.projectsConfigurations.projects[context.projectName]
  const cwd = options?.cwd ?? project.root

  options.rootDir = options.rootDir ?? './'
  options.outputPath = options.outputPath ?? `dist/${project.root}` // default: /dist/apps/{name}
  options.main = options.main.startsWith(cwd) ? options.main : join(cwd, options.main)
  options.tsConfig = options.tsConfig.startsWith(cwd) ? options.tsConfig : join(cwd, options.tsConfig)

  if (options.mergeAssets) {
    // merge defaultTargetOptions and project.json options
    options.assets = options.assets.concat(context.nxJsonConfiguration?.targetDefaults?.[context.targetName]?.options?.assets ?? [])
  }

  for await (const data of nxTscExecutor(options, context)) {
    if (!data.success) {
      throw new Error(`Error compiling: ${data.outfile}`)
    }
  }

  return { success: true }
}
