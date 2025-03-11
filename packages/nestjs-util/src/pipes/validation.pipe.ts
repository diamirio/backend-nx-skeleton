import type { ValidationError } from '@nestjs/common'
import { Injectable, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'

import { ClassValidatorException } from '../filters/interfaces'

@Injectable()
export class ExtendedValidationPipe extends ValidationPipe {
  constructor (options?: ValidationPipeOptions) {
    super({
      exceptionFactory: (errors: ValidationError[]): ClassValidatorException => new ClassValidatorException(...errors),
      ...options
    })
  }
}
