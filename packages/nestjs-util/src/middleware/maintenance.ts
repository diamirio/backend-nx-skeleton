import { Inject, NestMiddleware } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

import { MaintenanceService } from '../module/maintenance/maintenance.service'

export class MaintenanceMiddleware implements NestMiddleware {
  constructor (@Inject(MaintenanceService) private readonly service: MaintenanceService) {}

  async use (req: FastifyRequest, res: any, next: (err?: any) => any): Promise<void> {
    if (await this.service.isEnabled()) {
      this.service.throwException()
    }

    next()
  }
}
