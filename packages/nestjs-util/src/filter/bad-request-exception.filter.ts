import type { ValidationError } from '@nestjs/common'
import { BadRequestException, Catch } from '@nestjs/common'
import { EOL } from 'os'

import { GlobalExceptionFilter } from './global-exception.filter'
import { isValidationError } from './guard'
import type { ClassValidatorError, EnrichedException } from './interface'

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends GlobalExceptionFilter {
  // recursively flatten and format nested ValidationError
  static formatValidationErrors (errors: ValidationError[]): ClassValidatorError[] {
    const flattened: ClassValidatorError[] = []

    for (const { children, property, constraints } of errors) {
      if (Array.isArray(children) && children.length > 0) {
        flattened.push(...BadRequestExceptionFilter.formatValidationErrors(children))
      } else if (property && constraints) {
        flattened.push({
          property,
          constraints: Object.keys(constraints),
          messages: Object.values(constraints)
        })
      }
    }

    return flattened
  }

  protected payload (exception: BadRequestException): EnrichedException {
    const payload: EnrichedException = GlobalExceptionFilter.defaultPayload(exception)

    if (isValidationError(exception)) {
      const errors = BadRequestExceptionFilter.formatValidationErrors(exception.validation)

      return {
        ...payload,
        message: errors.flatMap((err) => err.messages).join(EOL),
        errors
      }
    }

    return payload
  }
}
