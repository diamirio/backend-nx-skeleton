import { Injectable, Logger } from '@nestjs/common'
import { Timeout } from '@nestjs/schedule'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { InjectMaintenanceService, MaintenanceService, Retry, UseMaintenanceLocker } from '@webundsoehne/nestjs-util'

@Injectable()
export class MigrationTask {
  private readonly logger: Logger = new Logger(this.constructor.name)

  constructor(@InjectConnection() private readonly connection: Connection, @InjectMaintenanceService() private readonly maintanenceService: MaintenanceService) {}

  @Timeout(0)
  @UseMaintenanceLocker()
  @Retry({
    retry: 24,
    interval: 3 * 1000
  })
  async migrate(): Promise<void> {
    try {
      await this.connection.runMigrations({ transaction: 'all' })
    } catch (error) {
      this.logger.error(error.message)

      throw error
    }
  }
}
