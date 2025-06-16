import { access, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Injectable, Logger, Optional, ServiceUnavailableException } from '@nestjs/common'

import type { MaintenanceOptions } from './interface'

@Injectable()
export class MaintenanceService {
  static instance: MaintenanceService

  public readonly message: string
  private readonly logger = new Logger(this.constructor.name)
  private readonly lockfile: string
  private readonly tasks: string[] = []

  constructor(@Optional() options?: MaintenanceOptions) {
    if (!MaintenanceService.instance) {
      this.message = `${options?.application ?? process.env.PACKAGE_NAME ?? 'Application'} is currently down for maintenance`
      this.lockfile = resolve(options?.lockfilePath ?? 'maintenance.lock')

      MaintenanceService.instance = this
    }
  }

  async enable(task = 'unknown-task'): Promise<void> {
    // add task to running tasks
    this.tasks.push(task)
    this.logger.debug(`Task added to maintenance queue: ${task}`)

    if (!(await this.isEnabled())) {
      this.logger.verbose(`Enabling maintenance mode (lockfile is ${this.lockfile})`)

      await writeFile(this.lockfile, '', { encoding: 'utf8' })

      this.logger.log('◆◆◆ Maintenance mode enabled ◆◆◆')

      return
    }

    this.logger.verbose('Maintenance mode already enabled.')
  }

  async disable(task = 'unknown-task'): Promise<void> {
    // remove task from running tasks
    this.tasks.splice(this.tasks.indexOf(task), 1)

    if (this.tasks.length === 0) {
      this.logger.verbose(`Disabling maintenance mode (lockfile is ${this.lockfile})`)

      try {
        await rm(this.lockfile)
      } catch (_) {
        this.logger.debug(`Lockfile was already missing: ${this.lockfile}`)
      }

      this.logger.log('◆◆◆ Maintenance mode disabled ◆◆◆')

      return
    }

    this.logger.verbose(`Not disabling maintenance mode still got running tasks: ${this.tasks.join(', ')}`)
  }

  async isEnabled(): Promise<boolean> {
    try {
      await access(this.lockfile)
    } catch (_error) {
      return false
    }

    return true
  }

  throwException(): void {
    throw new ServiceUnavailableException(this.message)
  }
}
