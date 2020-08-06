import { BuilderContext } from '@angular-devkit/architect'
import { SchematicContext } from '@angular-devkit/schematics'
import chalk from 'chalk'
import figures from 'figures'
import { EOL } from 'os'

import { LogLevels, LoggerOptions } from './logger.interface'

export class Logger {
  constructor (private context: BuilderContext | SchematicContext, private options?: LoggerOptions) {
    // set default options
    this.options = { useIcons: process.stdout.isTTY ? true : false, ...options }
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
    data
      .toString()
      .split(EOL)
      .forEach((line) => {
        if (line !== '') {
          if (isBuildContext(this.context)) {
            this.context.logger.log(level, this.logColoring({ level, message: `[${this.context?.target.project}] ` }) + line)
          } else {
            this.context.logger.log(level, this.logColoring({ level, message: `[${level.toUpperCase()}] ` }) + line)
          }
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
        coloring = chalk.bgRed.whiteBright
        icon = figures.main.cross
      }

      break

    case 'error':
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.cross
      }

      break

    case 'warn':
      if (this.options?.useIcons) {
        coloring = chalk.yellow
        icon = figures.main.warning
      }
      break

    case 'info':
      if (this.options?.useIcons) {
        coloring = chalk.green
        icon = figures.main.tick
      }
      break

    case 'debug':
      if (this.options?.useIcons) {
        coloring = chalk.dim
        icon = figures.main.play
      }
      break
    }

    if (!icon) {
      icon = `[${level.toUpperCase()}]`
    }

    return coloring(`${icon} ${message}`)
  }
}

function isBuildContext (context: BuilderContext | SchematicContext): context is BuilderContext {
  if (context.hasOwnProperty('target')) {
    return true
  }

  return false
}
