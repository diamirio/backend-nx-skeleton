import type { ExecutorContext } from '@nx/devkit'
import { join } from 'node:path'

import type { ExecutorResult } from '../inteface'
import { spawnProcess } from '../utils'
import type { TsNodeDevExecutorSchema } from './schema'

export default async function (options: TsNodeDevExecutorSchema, context: ExecutorContext): Promise<ExecutorResult> {
  const project = context.projectsConfigurations.projects[context.projectName]
  const cwd = join(context.root, options?.cwd ?? project.root)

  const processEnvs = {
    ...process.env,
    ...Object.assign({}, options.environment, options.env)
  }
  const processArgs = ['--project', options.tsConfig]

  if (options.debug) {
    processArgs.push('--debug')
  }

  if (options.watchConfig) {
    processArgs.push('--watch')
    processArgs.push('config')
  }

  if (options.args.length) {
    processArgs.push(...options.args)
  }

  processArgs.push(options.main)

  await spawnProcess(
    'ts-node-dev',
    processArgs,
    {
      cwd,
      env: processEnvs,
      // windows needs shell to spawn ts-node-dev process, on *nix false works fine (default)
      // https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
      shell: process.platform === 'win32'
    },
    context
  )

  return {
    success: true
  }
}
