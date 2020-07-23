import { Injectable, Logger } from '@nestjs/common'
import { RmqOptions, Transport } from '@nestjs/microservices'
import { Configurable, ConfigParam } from '@webundsoehne/nestjs-util'

@Injectable()
export class MicroservicesFactory {
  public static messageQueueConnect (queue: string): RmqOptions {
    return MicroservicesFactory.prototype.messageQueueGenerate(queue, true)
  }

  @Configurable()
  public messageQueueGenerate (queue: string, server?: boolean, @ConfigParam('message-queue') mqConfig?: Record<string, any>): RmqOptions {
    const logger = new Logger('Microservices')

    logger.log(`${server ? 'Hosting' : 'Connecting'} message queue: "${queue}"@"${mqConfig.protocol}://${mqConfig.host}:${mqConfig.port}"`)
    return {
      transport: Transport.RMQ,
      options: {
        urls: [ `${mqConfig.protocol}://${mqConfig.username ?? 'guest'}:${mqConfig.password ?? 'guest'}@${mqConfig.host}:${mqConfig.port}` ],
        queue,
        queueOptions: {
          ...mqConfig.options
        }
      }
    }
  }
}
