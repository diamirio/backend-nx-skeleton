import type { ExecutorContext } from '@nx/devkit'
import { jestExecutor } from '@nx/jest/src/executors/jest/jest.impl'
import { join } from 'node:path'
import * as process from 'node:process'

import type { ExecutorResult } from '../inteface'
import type { JestExecutorSchema } from './schema'

export default async function (options: JestExecutorSchema, context: ExecutorContext): Promise<ExecutorResult> {
  const project = context.projectsConfigurations.projects[context.projectName]
  const cwd = join(context.root, options?.cwd ?? project.root)

  Object.assign(process.env, options.environment, options.env)

  delete options.cwd
  delete options.env
  delete options.environment

  // move into the correct folder
  process.chdir(cwd)
  context.root = cwd

  return jestExecutor(options, context)
}
