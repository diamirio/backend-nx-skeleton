import type { NestMiddleware } from '@nestjs/common'
import { Inject } from '@nestjs/common'

import { MaintenanceService } from './maintenance.service'

export class MaintenanceMiddleware implements NestMiddleware {
  constructor(@Inject(MaintenanceService) private readonly service: MaintenanceService) {}

  async use(_req: never, _res: never, next: (err?: any) => unknown): Promise<void> {
    if (await this.service.isEnabled()) {
      this.service.throwException()
    }

    next()
  }
}
