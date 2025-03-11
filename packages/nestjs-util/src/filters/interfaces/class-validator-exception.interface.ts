import type { HttpStatus, ValidationError } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'
import { EOL } from 'os'
import { format } from 'util'

import type { ClassValidatorError } from './class-validator-error.interface'
import type { EnrichedExceptionError } from './enriched-exception.interface'

export class ClassValidatorException extends BadRequestException implements EnrichedExceptionError {
  public readonly statusCode: HttpStatus
  public error?: unknown
  public errors?: ClassValidatorError[]
  public service?: string

  constructor (...errors: ValidationError[]) {
    super('Validation failed.')

    this.statusCode = super.getStatus()
    const flattened = ClassValidatorException.formatValidationErrors(errors)

    this.message = flattened
      .flatMap((err) => Object.entries(err.constraints).map(([key, value]) => format('[%s]: fails constraint "%s" -> %s', err.property, key, value)))
      .join(EOL)

    this.errors = flattened
  }

  static formatValidationErrors (errors: ValidationError[], parent: string[] = []): ClassValidatorError[] {
    const flattened: ClassValidatorError[] = []

    for (const { children, property, constraints } of errors) {
      if (Array.isArray(children) && children.length > 0) {
        flattened.push(...ClassValidatorException.formatValidationErrors(children, [...parent, property]))
      } else if (property && constraints) {
        flattened.push({
          property: [...parent, property].join('.'),
          constraints
        })
      }
    }

    return flattened
  }
}
