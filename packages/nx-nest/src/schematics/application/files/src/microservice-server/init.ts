import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { LoggerService } from '@webundsoehne/nestjs-util'

import { createMicroserviceModule } from './microservices-server.module'

export async function createApplication(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(createMicroserviceModule(), {
    logger: new LoggerService(),
    ...messageQueueConnect(AuthMessageQueueConstants.queue)
  })

  await app.listenAsync()
}
