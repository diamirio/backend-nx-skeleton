import type { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import type { ListrTask } from 'listr2'

export function adaptLockFileTask (this: BaseCommand): ListrTask {
  return {
    title: 'Adapting the lock file.',
    task: async (_, task): Promise<void> => {
      await this.locker.lockAll()
      task.title = 'Lock file adapted.'
    }
  }
}
