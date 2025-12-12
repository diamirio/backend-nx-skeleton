import type { LogLevel } from '../logger.constants'

export interface LoggerMessage {
  level: LogLevel
  message: any
  context?: string
  trace?: any
}
