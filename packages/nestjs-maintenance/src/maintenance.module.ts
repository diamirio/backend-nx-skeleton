import { type DynamicModule, Module } from '@nestjs/common'

import type { MaintenanceOptions } from './interface'
import { MaintenanceService } from './maintenance.service'

@Module({})
export class MaintenanceModule {
  static forRoot(options?: MaintenanceOptions): DynamicModule {
    return {
      global: true,
      module: MaintenanceModule,
      providers: [
        {
          provide: MaintenanceService,
          useValue: new MaintenanceService(options)
        }
      ],
      exports: [MaintenanceService]
    }
  }
}
