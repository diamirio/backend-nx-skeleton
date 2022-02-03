import type { LoggerService as LoggerServiceCommon } from '@nestjs/common'
import winston from 'winston'

import { LogType, LOG_LEVEL } from './logger.constants'
import { Configurable, ConfigParam } from '@provider/config'

const { format } = winston

let logger: winston.Logger

export class LoggerService implements LoggerServiceCommon {
  constructor (private readonly context?: string) {}

  error (message: any, trace?: string, context?: string): void {
    this.logMessage({
      type: LogType.error,
      message,
      context,
      trace
    })
  }

  log (message: any, context?: string): void {
    this.logMessage({
      type: LogType.log,
      message,
      context
    })
  }

  warn (message: any, context?: string): void {
    this.logMessage({
      type: LogType.warn,
      message,
      context
    })
  }

  debug (message: any, context?: string): void {
    this.logMessage({
      type: LogType.debug,
      message,
      context
    })
  }

  verbose (message: any, context?: string): void {
    this.logMessage({
      type: LogType.verbose,
      message,
      context
    })
  }

  @Configurable()
  private getLogger (@ConfigParam('logLevel', LOG_LEVEL) level?: string): winston.Logger {
    if (!logger) {
      const loggingDisabled: boolean = level.toLowerCase() === 'none'

      logger = winston.createLogger({
        level,
        transports: [
          new winston.transports.Console({
            silent: loggingDisabled,
            stderrLevels: ['error']
          })
        ],
        format: format.combine(
          format.timestamp(),
          format.splat(),
          format.printf((data) => `[${data.timestamp}] [${data.level}] [${data.context}] - ${data.message}`)
        )
      })
    }

    return logger
  }

  private logMessage ({ type, message: rawMessage, context, trace }: { type: string, message: any, context?: string, trace?: any }): void {
    const [message, ...splat] = Array.isArray(rawMessage) ? rawMessage : [rawMessage]

    this.getLogger()[type]({
      context: context || this.context || this.constructor.name,
      message,
      splat
    })

    if (trace) {
      this.getLogger()[LogType.verbose]({
        context: context || this.context || this.constructor.name,
        message: trace
      })
    }
  }
}
