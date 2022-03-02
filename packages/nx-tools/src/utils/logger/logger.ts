import type { BuilderContext } from '@angular-devkit/architect'
import type { SchematicContext } from '@angular-devkit/schematics'
import type { ExecutorContext } from '@nrwl/devkit'
import figures from 'figures'
import { EOL } from 'os'
import winston, { format, transports } from 'winston'

import { isVerbose } from '../schematics'
import { isBuildContext, isExecutorContext } from '../schematics/is-context'
import { color } from './colorette'
import type { LoggerFormat, LoggerOptions, Winston } from './logger.interface'
import { LogLevels, WINSTON_INSTANCE } from './logger.interface'

/**
 * A general logger that is wrapped around the angular-cli logger.
 *
 * It is not great but winston was not working that well in a amazingly stateless architecture.
 */
export class Logger {
  static instance: Winston
  public logLevel: LogLevels
  private logger: Winston
  private context: string

  constructor (context?: BuilderContext | SchematicContext | ExecutorContext, private options?: LoggerOptions) {
    // set default options
    this.options = { useIcons: true, ...options }

    this.context = context && (isExecutorContext(context) ? context?.projectName : isBuildContext(context) ? context?.target.project : null)

    if (isVerbose()) {
      this.logLevel = LogLevels.DEBUG
    } else {
      this.logLevel = LogLevels.INFO
    }

    if (Logger.instance) {
      this.logger = Logger.instance
    } else {
      this.logger = this.initiateLogger()

      Logger.instance = this.logger
    }
  }

  fatal (data: string | Buffer, ...args: any): void {
    return this.parseMessage(LogLevels.FATAL, data, args)
  }

  error (data: string | Buffer, ...args: any): void {
    return this.parseMessage(LogLevels.ERROR, data, args)
  }

  warn (data: string | Buffer, ...args: any): void {
    return this.parseMessage(LogLevels.WARN, data, args)
  }

  info (data: string | Buffer, ...args: any): void {
    return this.parseMessage(LogLevels.INFO, data, args)
  }

  debug (data: string | Buffer, ...args: any): void {
    return this.parseMessage(LogLevels.DEBUG, data, args)
  }

  private initiateLogger (): Winston {
    const logFormat = format.printf(({ level, message, context }: LoggerFormat) => {
      // parse multi line messages
      let multiLineMessage: string[]

      multiLineMessage = message.split(EOL)

      multiLineMessage = multiLineMessage.filter((msg) => msg.trim() !== '').filter(Boolean)

      multiLineMessage = multiLineMessage.map((msg) => {
        // format messages
        return this.logColoring({
          level,
          message: msg,
          context
        })
      })

      return multiLineMessage.join(EOL)
    })

    const logger = winston.loggers.add(WINSTON_INSTANCE, {
      level: this.logLevel,
      format: format.combine(format.splat(), format.json({ space: 2 }), format.prettyPrint(), logFormat),
      levels: Object.values(LogLevels).reduce((o, level, i) => {
        return {
          ...o,
          [level]: i
        }
      }, {}),
      transports: [
        new transports.Console({
          stderrLevels: [LogLevels.FATAL, LogLevels.ERROR]
        })
      ]
    })

    logger.debug(`Initiated new nx-tools logger with level "${this.logLevel}".`, { context: 'LOGGER' })

    return logger as Winston
  }

  private parseMessage (level: LogLevels, data: string | Buffer, args: any[]): void {
    this.logger.log(level, data.toString(), ...args, { context: this.context })
  }

  private logColoring ({ level, message, context }: { level: LogLevels, message: string, context?: string }): string {
    let icon: string

    // do the coloring
    let coloring = (input: string): string => {
      return input
    }

    let msgColoring = (input: string): string => {
      return input
    }

    switch (level) {
    case LogLevels.FATAL:
      if (this.options?.useIcons) {
        coloring = (input): string => color.bgRed(color.white(input))
        icon = figures.cross
      }

      break

    case LogLevels.ERROR:
      if (this.options?.useIcons) {
        coloring = color.red
        icon = figures.cross
      }

      break

    case LogLevels.WARN:
      if (this.options?.useIcons) {
        coloring = color.yellow
        icon = figures.warning
      }

      break

    case LogLevels.INFO:
      if (this.options?.useIcons) {
        coloring = color.green
        icon = figures.pointerSmall
      }

      break

    case LogLevels.DEBUG:
      if (this.options?.useIcons) {
        coloring = color.cyan
        msgColoring = color.dim
        icon = ''
      }

      break
    }

    if (!icon) {
      icon = `[${level.toUpperCase()}]`
    }

    return `${coloring(icon)}${context ? ' ' + coloring(`[${context}]`) : ''} ${msgColoring(message)}`
  }
}
