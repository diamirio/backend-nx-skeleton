import { NestFactory } from '@nestjs/core'
import { LoggerService } from '@webundsoehne/nestjs-util'
import { CommandModule, CommandService } from 'nestjs-command'

import { createCommandModule } from './command.module'

export async function createApplication(): Promise<void> {
  const app = await NestFactory.createApplicationContext(createCommandModule(), {
    logger: new LoggerService()
  })

  app.select(CommandModule).get(CommandService).exec()
}
