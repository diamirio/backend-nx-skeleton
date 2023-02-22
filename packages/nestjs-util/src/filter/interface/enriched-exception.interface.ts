import type { HttpStatus } from '@nestjs/common'

import type { ClassValidatorError } from './class-validator-exception.interface'

/**
 * Mostly required for making instanceof check of graphql valid after version 15.0.3
 */
export class EnrichedExceptionError implements EnrichedException {
  public statusCode: HttpStatus
  public error: string
  public message: string
  public cause?: Error
  public errors?: string[] | ClassValidatorError[]
  public service?: string[]
  public stacktrace?: string

  constructor (error: EnrichedException) {
    Object.assign(this, error)
  }
}

export interface EnrichedException {
  statusCode: HttpStatus
  error: string
  message: string
  cause?: Error
  errors?: string[] | ClassValidatorError[]
  service?: string[]
  stacktrace?: string
}
