import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import { EnrichedHttpException } from './exception.interface'
import { getErrorMessage } from './util'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(this.constructor.name)

  constructor (private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch (exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const payload = this.payload(exception)

    // messages to avoid
    if (exception.message.match('favicon.ico')) {
      return undefined
    }

    this.logger.debug(`${payload.statusCode} - ${payload.error}: "${getErrorMessage(exception.message)}"`)
    this.logger.debug(exception.stack)

    const adapter = this.httpAdapterHost.httpAdapter
    adapter.reply(response, payload, payload.statusCode)
  }

  protected payload (exception?: Error): EnrichedHttpException {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Something went wrong, please try again later.',
      message: getErrorMessage(exception)
    }
  }
}
