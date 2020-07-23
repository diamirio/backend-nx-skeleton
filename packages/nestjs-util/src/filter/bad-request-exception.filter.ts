import { Catch, BadRequestException } from '@nestjs/common'

import { EnrichedHttpException } from './exception.interface'
import { GlobalExceptionFilter } from './global-exception.filter'
import { isValidationError, formatValidationError, getErrorMessage } from './util'

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends GlobalExceptionFilter {
  protected payload (exception: BadRequestException): EnrichedHttpException {
    const payload: EnrichedHttpException = {
      statusCode: exception.getStatus(),
      error: exception.message,
      message: getErrorMessage(exception.message)
    }

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
