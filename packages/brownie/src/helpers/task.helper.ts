import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { ListrTask } from 'listr2'

export function adaptLockFileTask (this: BaseCommand): ListrTask {
  return {
    title: 'Adapting the lock file.',
    task: async (ctx, task): Promise<void> => {
      await this.locker.lockAll()
      task.title = 'Lock file adapted.'
    }
  }
}
