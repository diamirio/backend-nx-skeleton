import { BuilderContext } from '@angular-devkit/architect'
import { SchematicContext } from '@angular-devkit/schematics'
import chalk from 'chalk'
import figures from 'figures'
import { EOL } from 'os'

import { LoggerOptions, LogLevels } from './logger.interface'

/**
 * A general logger that is wrapped around the angular-cli logger.
 *
 * It is not great but winston was not working that well in a amazingly stateless architecture.
 */
export class Logger {
  constructor (private context: BuilderContext | SchematicContext, private options?: LoggerOptions) {
    // set default options
    this.options = { useIcons: process.stdout.isTTY ? true : false, ...options }
  }

  public fatal (data: string | Buffer, ...args: any): void {
    return this.parseMessage('fatal', data, args)
  }

  public error (data: string | Buffer, ...args: any): void {
    return this.parseMessage('error', data, args)
  }

  public warn (data: string | Buffer, ...args: any): void {
    return this.parseMessage('warn', data, args)
  }

  public info (data: string | Buffer, ...args: any): void {
    return this.parseMessage('info', data, args)
  }

  public debug (data: string | Buffer, ...args: any): void {
    return this.parseMessage('debug', data, args)
  }

  private parseMessage (level: LogLevels, data: string | Buffer, args: any[]): void {
    data
      .toString()
      .split(EOL)
      .forEach((line) => {
        if (line !== '') {
          this.context.logger.log(
            level,
            this.logColoring({
              level,
              context: isBuildContext(this.context) ? this.context?.target.project : null,
              message: line
            }),
            ...args
          )
        }
      })
  }

  private logColoring ({ level, message, context }: { level: LogLevels, message: string, context?: string }): string {
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
        icon = figures.main.pointerSmall
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

    return `${coloring(icon)}${context ? ' ' + coloring(`[${context}]`) : ''} ${message}`
  }
}

function isBuildContext (context: BuilderContext | SchematicContext): context is BuilderContext {
  if (context.hasOwnProperty('target')) {
    return true
  }

  return false
}
