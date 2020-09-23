import { BadRequestException, Catch } from '@nestjs/common'

import { EnrichedException } from './exception.interface'
import { GlobalExceptionFilter } from './global-exception.filter'
import { formatValidationError, isValidationError } from './util'

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends GlobalExceptionFilter {
  protected payload (exception: BadRequestException): EnrichedException {
    const payload: EnrichedException = GlobalExceptionFilter.defaultPayload(exception)

    if (isValidationError(exception)) {
      const errors = formatValidationError(exception.validation)

      return {
        ...payload,
        message: errors.map((err) => err.messages.join(' | ')).join(' | '),
        errors
      }
    }

    return payload
  }
}
