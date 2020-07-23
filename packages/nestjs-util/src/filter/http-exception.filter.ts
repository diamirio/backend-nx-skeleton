import { Catch, HttpException } from '@nestjs/common'

import { EnrichedHttpException } from './exception.interface'
import { GlobalExceptionFilter } from './global-exception.filter'
import { getErrorMessage } from './util'

@Catch(HttpException)
export class HttpExceptionFilter extends GlobalExceptionFilter {
  protected payload (exception: HttpException): EnrichedHttpException {
    return {
      statusCode: exception.getStatus(),
      error: exception.message,
      message: getErrorMessage(exception.message)
    }
  }
}
