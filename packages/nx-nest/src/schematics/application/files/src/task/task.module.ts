import { Module } from '@nestjs/common'
import { ScheduleModule } from 'nest-schedule'

import * as tasks from './modules'

/**
 * Register all services under providers
 */

@Module({
  providers: [],
  imports: [ScheduleModule.register(), ...Object.values(tasks)]
})
export class AppTaskModule {}
