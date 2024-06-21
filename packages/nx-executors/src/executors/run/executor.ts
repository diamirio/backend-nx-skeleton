import type { ExecutorContext } from '@nx/devkit'
import { join } from 'node:path'

import type { ExecutorResult } from '../inteface'
import { spawnProcess } from '../utils'
import type { RunExecutorSchema } from './schema'

export default async function (options: RunExecutorSchema, context: ExecutorContext): Promise<ExecutorResult> {
  const project = context.projectsConfigurations.projects[context.projectName]
  const cwd = join(context.root, options?.cwd ?? project.root)
  const processEnvs = {
    ...process.env,
    ...Object.assign({}, options.environment, options.env)
  }

  await spawnProcess(options.command, options.args ?? [], { cwd, env: processEnvs }, context)

  return {
    success: true
  }
}
