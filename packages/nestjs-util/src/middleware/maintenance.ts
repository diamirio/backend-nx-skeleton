import { Inject, NestMiddleware } from '@nestjs/common'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { MaintenanceService } from '@module/maintenance/maintenance.service'

export class MaintenanceMiddleware implements NestMiddleware {
  constructor (@Inject(MaintenanceService) private readonly service: MaintenanceService) {}

  async use (_req: FastifyRequest, _res: FastifyReply, next: (err?: any) => any): Promise<void> {
    if (await this.service.isEnabled()) {
      this.service.throwException()
    }

    next()
  }
}
