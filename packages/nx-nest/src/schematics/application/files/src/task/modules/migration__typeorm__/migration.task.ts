import { Injectable, Logger } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { MaintenanceLocker } from '@webundsoehne/nestjs-util'
import { NestSchedule, Timeout, UseLocker } from 'nest-schedule'
import { Connection } from 'typeorm'

import { TimeoutTaskDefaults } from '../../defaults/task.constants'

@Injectable()
export class MigrationTask extends NestSchedule {
  private readonly logger: Logger = new Logger(this.constructor.name)

  constructor(@InjectConnection() private readonly connection: Connection) {
    super()
  }

  @Timeout(0, TimeoutTaskDefaults)
  @UseLocker(MaintenanceLocker)
  public async migrate(): Promise<void> {
    try {
      await this.connection.runMigrations({ transaction: 'all' })
    } catch (error) {
      this.logger.error(error.message)
      throw error
    }
  }
}
