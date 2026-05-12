import type { HttpStatus } from '@nestjs/common'

export interface AbstractError {
  [key: string]: any
  statusCode?: HttpStatus
  error?: string
  service?: string
  message: string
}
