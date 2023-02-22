import type { NestMiddleware } from '@nestjs/common'
import { Inject } from '@nestjs/common'

import type { Request, Response } from '@interface'
import { MaintenanceService } from '@module/maintenance/maintenance.service'

export class MaintenanceMiddleware implements NestMiddleware {
  constructor (@Inject(MaintenanceService) private readonly service: MaintenanceService) {}

  async use (_req: Request, _res: Response, next: (err?: any) => any): Promise<void> {
    if (await this.service.isEnabled()) {
      this.service.throwException()
    }

    next()
  }
}
