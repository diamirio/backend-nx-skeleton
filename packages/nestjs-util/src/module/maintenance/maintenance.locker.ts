import { Injectable, Logger } from '@nestjs/common'
import { ILocker, IScheduleConfig } from 'nest-schedule'

import { MaintenanceService } from './index'

@Injectable()
export class MaintenanceLocker implements ILocker {
  private readonly logger: Logger = new Logger(this.constructor.name)
  private readonly maintenance: MaintenanceService = new MaintenanceService()
  private key: string

  init (key: string, config: IScheduleConfig): void {
    this.logger.debug(`Maintenance mode enabled for ${key}, with properties: ${JSON.stringify(config)}`)

    this.key = key
  }

  async release (): Promise<void> {
    await this.maintenance.disable(this.key)
  }

  async tryLock (): Promise<boolean> {
    try {
      await this.maintenance.enable(this.key)

      return true
    } catch (error) {
      this.logger.error(error.message)

      return false
    }
  }
}
