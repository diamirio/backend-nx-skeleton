import { Module } from '@nestjs/common'
import { CommandModule } from 'nestjs-command'

import * as modules from './default/default.service'

/**
 * Register all services under providers
 */

@Module({
  providers: [ ...Object.values(modules) ],
  imports: [ CommandModule ]
})
export class AppCommandModule {}
