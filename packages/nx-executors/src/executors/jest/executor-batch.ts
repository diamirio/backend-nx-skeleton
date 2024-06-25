import type { ExecutorContext, TaskGraph } from '@nx/devkit'
import { batchJest } from '@nx/jest/src/executors/jest/jest.impl'
import type { BatchResults } from 'nx/src/tasks-runner/batch/batch-messages'

import type { JestExecutorSchema } from './schema'

export default async function (taskGraph: TaskGraph, inputs: Record<string, JestExecutorSchema>, overrides: JestExecutorSchema, context: ExecutorContext): Promise<BatchResults> {
  // const project = context.projectsConfigurations.projects[context.projectName]
  // const cwd = join(context.root, options?.cwd ?? project.root)
  //
  // process.env = {
  //   ...process.env,
  //   ...Object.assign({}, options.environment, options.env)
  // }
  //
  // process.chdir(cwd)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return batchJest(taskGraph, inputs, overrides, context)
}
