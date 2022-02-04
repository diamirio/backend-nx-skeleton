import { Global, Module } from '@nestjs/common'

import { MaintenanceService } from './maintenance.service'

@Global()
@Module({
  providers: [MaintenanceService],
  exports: [MaintenanceService]
})
export class MaintenanceModule {}
