import type { LoggerService as LoggerServiceCommon } from '@nestjs/common'
import winston from 'winston'
import Transport from 'winston-transport'

import { ColorSchema, LogType, LOG_LEVEL } from './logger.constants'
import { ConfigParam, Configurable } from '@provider/config'

export class LoggerService implements LoggerServiceCommon {
  static instance: winston.Logger

  private transports: Transport[] = [
    new winston.transports.Console({
      stderrLevels: ['error'],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.splat(),
        winston.format.printf(
          (data) =>
            `[${data.timestamp}]` + // timestamp
            ` ${ColorSchema[data.level](`[${data.level}]`)}` + // log-level
            (data.context ? ` [${data.context}]` : '') + // context (optional)
            ` - ${ColorSchema[data.level](data.message || 'missing log message')}` + // message
            (data.ms ? ` ${data.ms}` : '') // ms since last log (optional)
        )
      )
    })
  ]

  constructor (private readonly context?: string) {}

  addTransport (transport: Transport): this {
    if (transport instanceof Transport) {
      this.transports.push(transport)
    }

    return this
  }

  error (message: any, context?: string, trace?: string): void {
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
  private getLogger (@ConfigParam('logLevel', LOG_LEVEL) logLevel?: string): winston.Logger {
    if (!LoggerService.instance) {
      const level = LogType[logLevel.toLowerCase()] || LOG_LEVEL

      LoggerService.instance = winston.createLogger({
        level,
        transports: this.transports.map((transport) => {
          transport.level = transport.level || level
          transport.silent = transport.level === LogType.none

          return transport
        })
      })
    }

    return LoggerService.instance
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
