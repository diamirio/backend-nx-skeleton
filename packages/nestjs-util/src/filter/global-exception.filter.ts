import type { ArgumentsHost, ContextType, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'
import type { GqlContextType } from '@nestjs/graphql'
import { EOL } from 'os'
import type { Observable } from 'rxjs'
import { throwError } from 'rxjs'

import { isEnrichedException, isHttpException } from './guard'
import type { EnrichedException } from './interface'
import { EnrichedExceptionError } from './interface'
import type { Response } from '@interface'
import { isExpressResponse, isFastifyResponse } from '@util'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  protected logger = new Logger(this.constructor.name)

  static defaultPayload (exception: any): EnrichedException {
    if (isEnrichedException(exception)) {
      return exception
    } else if (isHttpException(exception)) {
      return new EnrichedExceptionError({
        statusCode: exception.getStatus(),
        error: exception.name,
        message: exception.message,
        cause: exception.cause,
        stacktrace: exception.stack
      })
    }

    return new EnrichedExceptionError({
      statusCode: exception?.statusCode ?? exception?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception?.response?.error.name ?? exception?.error?.name ?? exception?.constructor?.name ?? exception?.name ?? Error.name,
      message: GlobalExceptionFilter.format(exception),
      service: exception?.service,
      cause: exception?.cause,
      stacktrace: exception?.stack
    })
  }

  static format (error: string | Error): string | undefined {
    if (typeof error === 'string') {
      return error
    } else if (typeof error === 'object' && typeof error?.message === 'string') {
      return error.message
    }

    return JSON.stringify(error, null, 2)
  }

  static debug (logger: Logger, payload: EnrichedException): void {
    if (payload.stacktrace) {
      logger.debug(['[%s] - "%s"%s%s', payload.statusCode, payload.message, EOL, payload.stacktrace])

      return
    }

    logger.debug(['[%s] - "%s"', payload.statusCode, payload.message])
  }

  catch (exception: Error, host: ArgumentsHost): void | HttpException | Observable<never> {
    if (this.shouldIgnore(exception)) {
      return
    }

    const ctxType = host.getType<ContextType | GqlContextType>()

    const payload = this.payload(exception)

    // to have context specific fields in the payload already while logging
    switch (ctxType) {
    case 'rpc':
      payload.service = host
        .switchToRpc()
        .getContext()
        .args.map((args: any) => args.fields?.routingKey)
        .filter(Boolean)

      break
    }

    GlobalExceptionFilter.debug(this.logger, payload)

    switch (ctxType) {
    case 'graphql':
      return this.handleGraphQL(payload)

    case 'rpc':
      return this.handleRpc(payload)

    default:
      return this.handleHttp(payload, host)
    }
  }

  // ignore some errors that you do not want to log
  protected shouldIgnore (exception: Error): boolean {
    const ignoredMessages = ['favicon.ico']

    if (exception.message) {
      return ignoredMessages.some((err) => exception.message.match(err))
    }

    return false
  }

  protected payload (exception?: Error): EnrichedException {
    return GlobalExceptionFilter.defaultPayload(exception)
  }

  protected handleHttp (payload: EnrichedExceptionError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()

    // intentionally not using httpadapter injection because it caused problems before
    if (isFastifyResponse(response)) {
      void response.code(payload.statusCode).send(payload)
    } else if (isExpressResponse(response)) {
      void response.status(payload.statusCode)
      void response.send(payload)
    }
  }

  protected handleGraphQL (payload: EnrichedExceptionError): HttpException {
    return new HttpException(payload, payload.statusCode)
  }

  protected handleRpc (payload: EnrichedExceptionError): Observable<never> {
    return throwError(() => payload)
  }
}
