import { BadRequestException, ValidationError, HttpStatus } from '@nestjs/common'

export class ClassValidatorException extends BadRequestException {
  public validation: Partial<ValidationError[]>

  constructor (validation: Partial<ValidationError[]>) {
    const error = super()
    Object.assign(this, error, { validation })
  }
}

export interface EnrichedException {
  statusCode: HttpStatus
  error: string
  message?: string
  errors?: string[] | ClassValidatorError[]
  service?: string[]
  path?: string[]
  stacktrace?: string
}

export interface ClassValidatorError {
  property: string
  constraints: string[]
  messages: string[]
}
