import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import type { FastifyRequest, FastifyReply } from 'fastify'

import { EnrichedException, EnrichedExceptionError } from './exception.interface'
import { getErrorMessage, ignoreErrors, logErrorDebugMsg } from './util'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(this.constructor.name)

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
    const response: FastifyReply = ctx.getResponse()

    const payload = this.payload(exception)

    // messages to avoid
    if (ignoreErrors(exception)) {
      return
    }

    if (request && response?.send) {
      logErrorDebugMsg(this.logger, payload, exception.stack)

      // do not handle internal error mechanisms
      if (response.code) {
        response.code(payload.statusCode).send(payload)
      } else {
        response.status(payload.statusCode)
        response.send(payload)
      }
    }
  }

  protected payload (exception?: Error): EnrichedException {
    return GlobalExceptionFilter.defaultPayload(exception)
  }
}
