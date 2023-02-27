import type { HttpStatus } from '@nestjs/common'

import type { ClassValidatorError } from './class-validator-exception.interface'

export interface EnrichedException extends Error {
  statusCode: HttpStatus
  error: string | Error
  message: string
  cause?: string | Error

  // class validator specific
  errors?: string[] | ClassValidatorError[]

  // graphql specific
  code?: string

  // microservices specific
  service?: string[]

  // internally used
  stacktrace?: string
}

/**
 * Mostly required for making instanceof check of graphql valid after version 15.0.3
 */
export class EnrichedExceptionError extends Error implements EnrichedException {
  public statusCode: HttpStatus
  public error: string | Error
  public message: string
  public cause?: string | Error
  public errors?: string[] | ClassValidatorError[]
  public service?: string[]
  public stacktrace?: string

  constructor (error: Omit<EnrichedException, 'name'>) {
    super(error.message)

    this.name = error?.error instanceof Error ? error.error.name : error?.error

    Object.assign(this, error)
  }
}
