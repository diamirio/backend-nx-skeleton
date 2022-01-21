import { BuilderContext } from '@angular-devkit/architect'
import { SchematicContext } from '@angular-devkit/schematics'
import { ExecutorContext, logger as nxLogger } from '@nrwl/devkit'
import figures from 'figures'
import { EOL } from 'os'

import { isVerbose } from '../schematics'
import { isBuildContext, isExecutorContext } from '../schematics/is-context'
import { color } from './colorette'
import { LoggerOptions, LogLevels } from './logger.interface'

/**
 * A general logger that is wrapped around the angular-cli logger.
 *
 * It is not great but winston was not working that well in a amazingly stateless architecture.
 */
export class Logger {
  static instance: Logger
  private logger: BuilderContext['logger'] | SchematicContext['logger'] | typeof nxLogger

  constructor (private context?: BuilderContext | SchematicContext | ExecutorContext, private options?: LoggerOptions) {
    if (Logger.instance instanceof Logger) {
      return Logger.instance
    }

    this.logger = isExecutorContext(context) || !context ? nxLogger : context.logger

    if (!isVerbose()) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.logger.debug = (): void => {}
    }

    // set default options
    this.options = { useIcons: process.stdout.isTTY && true, ...options }

    Logger.instance = this

    return Logger.instance
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
          this.logger[level](
            this.logColoring({
              level,
              context: isExecutorContext(this.context) ? this.context.projectName : isBuildContext(this.context) ? this.context?.target.project : null,
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
        coloring = (input): string => color.bgRed(color.white(input))
        icon = figures.cross
      }

      break

    case 'error':
      if (this.options?.useIcons) {
        coloring = color.red
        icon = figures.cross
      }

      break

    case 'warn':
      if (this.options?.useIcons) {
        coloring = color.yellow
        icon = figures.warning
      }
      break

    case 'info':
      if (this.options?.useIcons) {
        coloring = color.green
        icon = figures.pointerSmall
      }
      break

    case 'debug':
      if (this.options?.useIcons) {
        coloring = color.dim
        icon = figures.play
      }
      break
    }

    if (!icon) {
      icon = `[${level.toUpperCase()}]`
    }

    return `${coloring(icon)}${context ? ' ' + coloring(`[${context}]`) : ''} ${message}`
  }
}
