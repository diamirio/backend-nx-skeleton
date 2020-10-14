import { ClientProxyFactory } from '@nestjs/microservices'
import { Transport } from '@nestjs/microservices/enums/transport.enum'
import { ConfigService } from '@webundsoehne/nestjs-util'

import { MessageQueueEnum } from '../microservice-provider.constants'

export function provideMessageQueueClient(queue: MessageQueueEnum | MessageQueueEnum[]) {
  queue = !Array.isArray(queue) ? [queue] : queue

  return queue.map((q) => ({
    provide: q,
    useFactory: (): ClientProxyFactory => {
      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          queue: q,
          urls: ConfigService.get('messageQueue')?.urls
        }
      })
    }
  }))
}
