import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { FastifyRequest } from 'fastify'

import { EnrichedException, EnrichedExceptionError } from './exception.interface'
import { getErrorMessage, ignoreErrors, logErrorDebugMsg } from './util'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(this.constructor.name)

  constructor (private readonly httpAdapterHost: HttpAdapterHost) {}

  public static defaultPayload (exception: any): EnrichedException {
    return new EnrichedExceptionError({
      statusCode: typeof exception?.status === 'number' ? exception?.status : HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception?.error ?? exception.message,
      message: getErrorMessage(exception),
      service: exception?.service
    })
  }

  public catch (exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const request: FastifyRequest = ctx.getRequest()

    const payload = this.payload(exception)

    // messages to avoid
    if (ignoreErrors(exception)) {
      return
    }

    if (request && this.httpAdapterHost?.httpAdapter) {
      logErrorDebugMsg(this.logger, payload, exception.stack)

      // do not handle internal error mechanisms
      const response = ctx.getResponse()
      this.httpAdapterHost.httpAdapter.reply(response, payload, payload.statusCode)
    }
  }

  protected payload (exception?: Error): EnrichedException {
    return GlobalExceptionFilter.defaultPayload(exception)
  }
}
