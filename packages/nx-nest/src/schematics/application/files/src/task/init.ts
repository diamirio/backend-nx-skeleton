import { NestFactory } from '@nestjs/core'
import { LoggerService } from '@webundsoehne/nestjs-util'

import { AppTaskModule } from './task.module'

export async function createApplication (): Promise<void> {
  await NestFactory.createApplicationContext(AppTaskModule, {
    logger: new LoggerService()
  })
}
