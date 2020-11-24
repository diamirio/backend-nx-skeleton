import { NestFactory } from '@nestjs/core'
import { LoggerService } from '@webundsoehne/nestjs-util'

import { createTaskModule } from './task.module'

export async function createApplication(): Promise<void> {
  await NestFactory.createApplicationContext(createTaskModule(), {
    logger: new LoggerService()
  })
}
