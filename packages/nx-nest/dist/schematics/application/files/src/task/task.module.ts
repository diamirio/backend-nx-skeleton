import { Module } from '@nestjs/common'
import { ScheduleModule } from 'nest-schedule'

import { TaskService } from './task.service'

/**
 * Register all services under providers
 */

@Module({
  providers: [TaskService],
  imports: [ScheduleModule.register()]
})
export class AppTaskModule {}
