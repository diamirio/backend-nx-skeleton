import type { ExecutorContext } from '@nx/devkit'
import type { RunCommandsOptions } from 'nx/src/executors/run-commands/run-commands.impl'
import runCommands from 'nx/src/executors/run-commands/run-commands.impl'

import type { ExecutorResult } from '../inteface'

function normalizeNodeOptions (env?: string | string[]): string[] {
  const options = []

  if (!env) {
    return options
  }

  if (typeof env === 'string') {
    options.push(env)
  } else if (Array.isArray(env)) {
    options.push(...env)
  }

  return options
}
export function setNodeOptionsEnvironmentVariables (env: string[]): { NODE_OPTIONS: string } {
  return { NODE_OPTIONS: env.join(' ') }
}

export default async function ({ nodeOptions, tsNode, ...options }: RunCommandsOptions, context: ExecutorContext): Promise<ExecutorResult> {
  const project = context.projectsConfigurations.projects[context.projectName]

  nodeOptions = normalizeNodeOptions(options.nodeOptions)
  options.cwd = options.cwd ?? project.root
  options.env = {
    ...process.env,
    ...Object.assign({}, options.environment, options.env)
  }

  if (tsNode) {
    if (!nodeOptions.find((option: string) => option.includes('ts-node/register'))) {
      nodeOptions.push('-r ts-node/register')
    }
  }

  if (nodeOptions) {
    options.env = {
      ...options.env,
      ...setNodeOptionsEnvironmentVariables(nodeOptions)
    }
  }

  return runCommands(options, context)
}
