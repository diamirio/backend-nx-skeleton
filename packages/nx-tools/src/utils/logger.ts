import { BuilderContext } from '@angular-devkit/architect'
import chalk from 'chalk'
import figures from 'figures'
import { EOL } from 'os'

import { LogLevels, LoggerOptions } from './logger.interface'

export class Logger {

  constructor (private context: BuilderContext, private options?: LoggerOptions) {
    // set default options
    this.options = { useIcons: true, ...options }
  }

  public fatal (data: string | Buffer): void {
    return this.parseMessage('fatal', data)
  }

  public error (data: string | Buffer): void {
    return this.parseMessage('error', data)
  }

  public warn (data: string | Buffer): void {
    return this.parseMessage('warn', data)
  }

  public info (data: string | Buffer): void {
    return this.parseMessage('info', data)
  }

  public debug (data: string | Buffer): void {
    return this.parseMessage('debug', data)
  }

  private parseMessage (level: LogLevels, data: string | Buffer): void {
    data.toString().split(EOL).forEach((line) => {
      if (line !== '') {
        this.context.logger.log(level, this.logColoring({ level, message: `[${this.context.target.project}] ` }) + line)
      }
    })
  }

  private logColoring ({ level, message }: { level: LogLevels, message: string }): string {
    let icon: string

    // do the coloring
    let coloring = (input: string): string => {
      return input
    }

    switch (level) {
    case 'fatal':
      if (this.options?.useIcons) {
        coloring = chalk.bgRed.red
        icon = figures.main.cross
      } else {
        icon = '[FATAL]'
      }

      break

    case 'error':
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.cross
      } else {
        icon = '[ERROR]'
      }

      break

    case 'warn':
      if (this.options?.useIcons) {
        coloring = chalk.yellow
        icon = figures.main.warning
      } else {
        icon = '[WARN]'
      }
      break

    case 'info':
      if (this.options?.useIcons) {
        coloring = chalk.green
        icon = figures.main.tick
      } else {
        icon = '[INFO]'
      }
      break

    case 'debug':
      if (this.options?.useIcons) {
        coloring = chalk.dim
        icon = figures.main.play
      } else {
        icon = '[DEBUG]'
      }
      break

    }

    return coloring(`${icon} ${message}`)
  }
}
