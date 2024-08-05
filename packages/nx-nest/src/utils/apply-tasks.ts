import type { GeneratorCallback } from '@nx/devkit'
import { output } from 'nx/src/utils/output'

export function applyTasks (tasks: GeneratorCallback[]): () => Promise<void> {
  return async () => {
    for (const task of tasks) {
      try {
        await task()
      } catch (error) {
        output.error({
          title: 'Error on post-processing',
          bodyLines: error.message?.split('\n').filter((line: string) => !!line.trim())
        })
      }
    }
  }
}
