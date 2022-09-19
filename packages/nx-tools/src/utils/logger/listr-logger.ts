import type { BuilderContext } from '@angular-devkit/architect'
import type { SchematicContext } from '@angular-devkit/schematics'
import type { ExecutorContext } from '@nrwl/devkit'
import { Logger as BaseLogger } from 'listr2'

import { Logger } from './logger'

export class ListrLogger extends BaseLogger {
  public logger: Logger

  constructor (context?: BuilderContext | SchematicContext | ExecutorContext) {
    super()

    this.logger = new Logger(context)
  }

  fail (message: string): void {
    this.logger.error(message)
  }

  skip (message: string): void {
    this.logger.warn(message, { status: 'skip' })
  }

  success (message: string): void {
    this.logger.info(message, { status: 'end' })
  }

  data (message: string): void {
    this.logger.info(message)
  }

  start (message: string): void {
    this.logger.info(message, { status: 'run' })
  }

  title (message: string): void {
    this.logger.info(message)
  }

  retry (message: string): void {
    this.logger.warn(message, { status: 'retry' })
  }

  rollback (message: string): void {
    this.logger.warn(message, { status: 'rollback' })
  }
}
