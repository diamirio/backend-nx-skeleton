import type { ClsService } from 'nestjs-cls'

import type { LogLevel } from '../logger.constants'
import { Format, Transport } from './winston.interface'

export interface LoggerOptions {
  context?: string
  logLevel?: LogLevel
  traceLogLevel?: LogLevel
  clsService?: ClsService
  format?: Format
  transports?: Transport[]
}
