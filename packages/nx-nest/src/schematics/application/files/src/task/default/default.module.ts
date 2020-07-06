import { Module } from '@nestjs/common'

import { DefaultTaskService } from './default.task'

@Module({
  providers: [ DefaultTaskService ],
  exports: [ DefaultTaskService ]
})
export class DefaultTaskModule {}
