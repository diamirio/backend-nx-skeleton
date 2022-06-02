import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpStatus, Logger } from '@nestjs/common'
import type { FastifyRequest, FastifyReply } from 'fastify'

import type { EnrichedException } from './exception.interface'
import { EnrichedExceptionError } from './exception.interface'
import { getErrorMessage, ignoreErrors, logErrorDebugMsg } from './util'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  protected logger = new Logger(this.constructor.name)

  static defaultPayload (exception: any): EnrichedException {
    return new EnrichedExceptionError({
      statusCode: typeof exception?.status === 'number' ? exception?.status : HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception?.error ?? exception.message,
      message: getErrorMessage(exception),
      service: exception?.service
    })
  }

  catch (exception: Error, host: ArgumentsHost): void {
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
        void response.code(payload.statusCode).send(payload)
      } else {
        void response.status(payload.statusCode)
        void response.send(payload)
      }
    }
  }

  protected payload (exception?: Error): EnrichedException {
    return GlobalExceptionFilter.defaultPayload(exception)
  }
}
