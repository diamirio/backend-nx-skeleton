import { Logger } from '@nestjs/common'

import type { UseRetryOptions } from './use-retry.interface'

export async function useRetry<T> (callback: () => T, options?: UseRetryOptions): Promise<T> {
  const logger = new Logger('Retry')

  options = {
    retry: 1,
    interval: 1000,
    name: 'Task',
    ...options ?? {}
  }

  for (let retries = 1; retries <= options.retry; retries++) {
    try {
      // handle the results
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const result = await callback()

      return result
    } catch (err) {
      if (retries === options.retry) {
        throw err
      }

      logger.debug(err)

      logger.warn(`Retrying task: ${options.name} with attempt number ${retries} in ${options.interval}ms`)

      await new Promise((resolve) => setTimeout(resolve, options.interval))
    }
  }
}
