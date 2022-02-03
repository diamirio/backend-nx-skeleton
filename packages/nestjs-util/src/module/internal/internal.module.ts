import { Module } from '@nestjs/common'

import { InternalController } from './internal.controller'
import { InternalService } from './internal.service'

@Module({
  controllers: [InternalController],
  providers: [InternalService],
  exports: [InternalService]
})
export class InternalModule {}
