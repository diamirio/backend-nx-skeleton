import { NestFactory } from '@nestjs/core'
import { CommandModule, CommandService } from 'nestjs-command'
import { LoggerService } from '@webundsoehne/nestjs-util'

import { AppCommandModule } from './command.module'

export async function createApplication (): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppCommandModule, {
    logger: new LoggerService()
  })

  app
    .select(CommandModule)
    .get(CommandService)
    .exec()
}
