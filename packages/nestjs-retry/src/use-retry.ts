import { Logger } from '@nestjs/common'

import type { UseRetryOptions } from './use-retry-options.interface'

export async function useRetry<T>(callback: () => T, options?: UseRetryOptions): Promise<T> {
  const logger = new Logger('Retry')

  options = {
    retry: 1,
    interval: 1000,
    name: 'Task',
    ...(options ?? {})
  }

  for (let retries = 1; retries <= options.retry; retries++) {
    try {
      // handle the results
      return await callback()
    } catch (error) {
      if (retries === options.retry) {
        throw error
      }

      logger.warn(`Retrying task: ${options.name} with attempt number ${retries} in ${options.interval}ms`)

      await new Promise((resolve) => setTimeout(resolve, options.interval))
    }
  }
}
