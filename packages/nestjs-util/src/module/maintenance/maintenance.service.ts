import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import fs from 'fs-extra'
import path from 'path'

import { Configurable, ConfigParam } from '@provider/config'

@Injectable()
export class MaintenanceService {
  static instance: MaintenanceService
  public readonly message: string
  private readonly logger = new Logger(this.constructor.name)
  private readonly lockfile: string
  private readonly tasks: string[] = []

  constructor () {
    if (!MaintenanceService.instance) {
      this.message = this.prepareMessage()
      this.lockfile = this.prepareLockfile()

      MaintenanceService.instance = this
    }

    return MaintenanceService.instance
  }

  async enable (task = 'unknown-task'): Promise<void> {
    // add task to running tasks
    this.tasks.push(task)

    if (!await this.isEnabled()) {
      this.logger.verbose(`Enabling maintenance mode (lockfile is ${this.lockfile})`)

      await fs.ensureFile(this.lockfile)

      this.logger.log('◆◆◆ Maintenance mode enabled ◆◆◆')
    } else {
      this.logger.verbose('Maintenance mode already enabled.')
    }
  }

  async disable (task = 'unknown-task'): Promise<void> {
    // remove task from running tasks
    this.tasks.splice(this.tasks.indexOf(task), 1)

    if (this.tasks.length === 0) {
      this.logger.verbose(`Disabling maintenance mode (lockfile is ${this.lockfile})`)

      await fs.remove(this.lockfile)

      this.logger.log('◆◆◆ Maintenance mode disabled ◆◆◆')
    } else {
      this.logger.verbose(`Not disabling maintenance mode still got running tasks: "${this.tasks.toString()}".`)
    }
  }

  async isEnabled (): Promise<boolean> {
    try {
      await fs.access(this.lockfile)
    } catch (error) {
      return false
    }

    return true
  }

  throwException (): void {
    throw new ServiceUnavailableException(this.message)
  }

  @Configurable()
  private prepareMessage (@ConfigParam('misc.maintenanceNotification') message?: string, @ConfigParam('url.basePath') basePath?: string): string {
    return message || `${basePath} is currently down for maintenance`
  }

  @Configurable()
  private prepareLockfile (@ConfigParam('misc.lockfile', 'maintenance.lock') lockfile?: string): string {
    return path.resolve(lockfile)
  }
}
