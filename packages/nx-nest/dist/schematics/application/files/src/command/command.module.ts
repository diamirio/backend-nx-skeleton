import { Module } from '@nestjs/common'
import { CommandModule } from 'nestjs-command'

import { CommandService } from './command.service'

/**
 * Register all services under providers
 */

@Module({
  providers: [CommandService],
  imports: [CommandModule]
})
export class AppCommandModule {}
