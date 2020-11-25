import { FactoryProvider } from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'
import { Transport } from '@nestjs/microservices/enums/transport.enum'

import { ConfigService } from '@provider/config/config.service'

/**
 * Provide a message queue client with the supplied names of queues.
 * Currently only supports RabbitMQ, but can be made generic later on.
 * @param queue
 */
export function provideMessageQueueClient (queue: string | string[]): FactoryProvider<ClientProxyFactory>[] {
  queue = !Array.isArray(queue) ? [ queue ] : queue
  const options = ConfigService.get('messageQueue')?.clientOptions

  // currently only works for rabbitmq, idk if it is worth atm to make it generic even though i want to do it xd
  return queue.map((q) => ({
    provide: q,
    useFactory: (): ClientProxyFactory => {
      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          ...options,
          queue: q
        }
      })
    }
  }))
}