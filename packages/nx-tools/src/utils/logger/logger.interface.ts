import type { LoggerApi } from '@angular-devkit/core/src/logger'
import type { Logger as WinstonLogger, LeveledLogMethod } from 'winston'

export type AvailableLogLevels = keyof Omit<LoggerApi, 'createChild' | 'log'>

export interface LoggerOptions {
  useIcons?: boolean
}

export enum LogLevels {
  FATAL = 'fatal',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LoggerFormat {
  level: LogLevels
  message: string
  context: string
}

export type Winston = WinstonLogger & Record<keyof typeof LogLevels, LeveledLogMethod>

export const WINSTON_INSTANCE = 'WINSTON_DEFAULT_LOGGER'
