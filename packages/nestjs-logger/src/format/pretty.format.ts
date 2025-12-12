import { format } from 'winston'

import { Format } from '../interface/winston.interface'
import { BaseFormat } from './base.format'

export const PrettyFormat: Format = format.combine(
  BaseFormat,
  format.colorize({ level: true, message: true }),
  format.printf(
    (data: any) =>
      `[${data.timestamp}]` + // timestamp
      ` [${data.level}]` + // log-level
      (data.context ? ` [${data.context}]` : '') + // context (optional)
      (data.requestId ? ` - ${data.requestId}` : '') + // request-id (optional)
      ` - ${data.message || 'missing log message'}` // message
  )
)
