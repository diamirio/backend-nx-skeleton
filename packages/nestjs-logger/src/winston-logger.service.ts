import { Injectable, type LoggerService, Optional } from '@nestjs/common'
import { createLogger, type Logger, transports } from 'winston'

import { PrettyFormat } from './format/pretty.format'
import type { LoggerMessage } from './interface/logger-message.interface'
import type { LoggerOptions } from './interface/logger-options.interface'
import { LogLevel } from './logger.constants'

@Injectable()
export class WinstonLogger implements LoggerService {
  private readonly instance: Logger
  private readonly context: string
  private readonly options: LoggerOptions

  constructor(@Optional() contextOrOptions?: string | LoggerOptions, @Optional() options?: LoggerOptions) {
    this.context = typeof contextOrOptions === 'string' ? contextOrOptions : contextOrOptions?.context
    this.options = typeof contextOrOptions !== 'string' ? contextOrOptions : options
    this.options ??= {}

    // write back possible overwrites to options
    this.options.context = this.context
    this.options.logLevel = this.getLogLevelFromString(this.options.logLevel, LogLevel.debug)

    this.instance = createLogger({
      level: this.options.logLevel,
      silent: this.options.logLevel === LogLevel.none,
      transports: this.options.transports ?? [new transports.Console({ format: this.options.format ?? PrettyFormat })]
    })
  }

  error(message: any, ...optionalParams: any[]): void {
    this.logMessage({
      level: LogLevel.error,
      message,
      context: optionalParams[1] ?? optionalParams[0],
      trace: optionalParams[1] ? optionalParams[0] : undefined
    })
  }

  log(message: any, context?: string): void {
    this.logMessage({
      level: LogLevel.info,
      message,
      context
    })
  }

  warn(message: any, context?: string): void {
    this.logMessage({
      level: LogLevel.warn,
      message,
      context
    })
  }

  debug(message: any, context?: string): void {
    this.logMessage({
      level: LogLevel.debug,
      message,
      context
    })
  }

  verbose(message: any, context?: string): void {
    this.logMessage({
      level: LogLevel.verbose,
      message,
      context
    })
  }

  protected logMessage({ level, message: rawMessage, context, trace }: LoggerMessage): void {
    const [message, ...splat] = Array.isArray(rawMessage) ? rawMessage : [rawMessage]

    this.instance[level]({
      context: context ?? this.context ?? this.constructor.name,
      requestId: this.options.clsService?.getId(),
      message,
      splat
    })

    if (trace) {
      this.logMessage({
        level: this.getLogLevelFromString(this.options.traceLogLevel, LogLevel.verbose),
        message: trace,
        context,
        trace: false
      })
    }
  }

  private getLogLevelFromString(logLevel: string, fallback?: LogLevel): LogLevel {
    return LogLevel[logLevel?.toLowerCase()] ?? fallback
  }
}
