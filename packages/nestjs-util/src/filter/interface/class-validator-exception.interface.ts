import type { ValidationError } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'

export interface ClassValidatorError {
  property: string
  constraints: string[]
  messages: string[]
}

export class ClassValidatorException extends BadRequestException {
  public validation: Partial<ValidationError[]>

  constructor (validation: Partial<ValidationError[]>) {
    const error = super()

    Object.assign(this, error, { validation })
  }
}
