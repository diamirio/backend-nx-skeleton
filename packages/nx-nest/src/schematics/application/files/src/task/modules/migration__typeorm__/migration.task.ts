import { Injectable, Logger } from '@nestjs/common'
import { getDatabaseOptions } from '@util/database'
import { MaintenanceLocker } from '@webundsoehne/nestjs-util'
import { Timeout, NestSchedule, UseLocker } from 'nest-schedule'
import { createConnection } from 'typeorm'

@Injectable()
export class MigrationTask extends NestSchedule {
  private readonly logger: Logger = new Logger(this.constructor.name)

  @Timeout(0, { maxRetry: 24, retryInterval: 2.5 * 1000 })
  @UseLocker(MaintenanceLocker)
  public async migrate (): Promise<void> {
    try {
      const connection = await createConnection({ ...getDatabaseOptions(), logging: true })

      await connection.runMigrations({ transaction: 'all' })
      await connection.close()
    } catch (error) {
      this.logger.error(error.message)
      throw error
    }
  }
}
