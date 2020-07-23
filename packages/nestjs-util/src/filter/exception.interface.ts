import { BadRequestException, ValidationError, HttpStatus } from '@nestjs/common'

export class ClassValidatorException extends BadRequestException {
  public validation: Partial<ValidationError[]>

  constructor (validation: Partial<ValidationError[]>) {
    const error = super()
    Object.assign(this, error, { validation })
  }
}

export interface EnrichedHttpException {
  statusCode: HttpStatus
  error: string
  message?: string
  errors?: string[] | ClassValidatorError[]
}

export interface ClassValidatorError {
  property: string
  constraints: string[]
  messages: string[]
}
