import type { FactoryProvider } from '@nestjs/common'

import type { MicroserviceProviderClientOptions } from '../microservice-provider.interface'
import { ClientProxyRMQ } from './client-rmq.proxy'
import { ConfigService } from '@webundsoehne/nestjs-util'

/**
 * Provide a message queue client with the supplied names of queues.
 * Currently only supports RabbitMQ
 * @param queue
 * @param options
 */
export function provideMessageQueueClient (queue: string | string[], options?: MicroserviceProviderClientOptions): FactoryProvider<ClientProxyRMQ>[] {
  queue = !Array.isArray(queue) ? [queue] : queue
  options = options ? options : ConfigService.get('messageQueue.clientOptions')
  const urls = options?.urls ? options?.urls : ConfigService.get('messageQueue.urls')

  return queue.map((q) => ({
    provide: q,
    useFactory: (): ClientProxyRMQ => {
      return new ClientProxyRMQ({
        ...options,
        queue: q,
        urls
      })
    }
  }))
}
