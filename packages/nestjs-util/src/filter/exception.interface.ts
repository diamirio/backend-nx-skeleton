import type { HttpStatus, ValidationError } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'

export class ClassValidatorException extends BadRequestException {
  public validation: Partial<ValidationError[]>

  constructor (validation: Partial<ValidationError[]>) {
    const error = super()

    Object.assign(this, error, { validation })
  }
}

/**
 * Mostly required for making instanceof check of graphql valid after version 15.0.3
 */
export class EnrichedExceptionError implements EnrichedException {
  public statusCode: HttpStatus
  public error: string
  public message: string
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
  errors?: string[] | ClassValidatorError[]
  service?: string[]
  stacktrace?: string
}

export interface ClassValidatorError {
  property: string
  constraints: string[]
  messages: string[]
}
