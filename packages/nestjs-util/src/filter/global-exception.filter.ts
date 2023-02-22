import type { ArgumentsHost, ContextType, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'
import type { GqlContextType, GqlExceptionFilter } from '@nestjs/graphql'
import { EOL } from 'os'

import { isEnrichedException, isHttpException } from './guard'
import type { EnrichedException } from './interface'
import { EnrichedExceptionError } from './interface'
import type { Response } from '@interface'
import { isExpressResponse, isFastifyResponse } from '@util'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
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
      error: exception?.response?.error.name ?? exception?.error?.name ?? exception?.name ?? exception?.constructor?.name ?? Error.name,
      message: GlobalExceptionFilter.formatMessage(exception),
      service: exception?.service,
      cause: exception?.cause,
      stacktrace: exception?.stack
    })
  }

  static formatMessage (error: string | Error): string | undefined {
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
    }

    logger.debug(['[%s] - "%s"', payload.statusCode, payload.message])
  }

  catch (exception: Error, host: ArgumentsHost): void | HttpException {
    if (this.shouldIgnore(exception)) {
      return
    }

    const ctxType = host.getType<ContextType | GqlContextType>()

    // this should be already handled by the RpcGlobalExceptionFilter
    if (['rpc'].includes(ctxType)) {
      return
    }

    const ctx = host.switchToHttp()

    const response: Response = ctx.getResponse()

    const payload = this.payload(exception)

    GlobalExceptionFilter.debug(this.logger, payload)

    delete payload.stacktrace

    if (['graphql'].includes(ctxType)) {
      return new HttpException(payload, payload.statusCode)
    }

    this.reply(response, payload.statusCode, payload)
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

  protected reply (response: Response, code: number, payload: EnrichedExceptionError): void {
    if (isFastifyResponse(response)) {
      void response.code(code).send(payload)
    } else if (isExpressResponse(response)) {
      void response.status(code)
      void response.send(payload)
    }
  }
}
