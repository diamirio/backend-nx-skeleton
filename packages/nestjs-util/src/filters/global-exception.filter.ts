import type { ArgumentsHost, ContextType, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException, InternalServerErrorException, Logger } from '@nestjs/common'
import { HttpAdapterHost, ModuleRef } from '@nestjs/core'
import type { GqlContextType } from '@nestjs/graphql'
import type { RpcException } from '@nestjs/microservices'
import { EOL } from 'os'
import type { Observable } from 'rxjs'
import { throwError } from 'rxjs'
import { format } from 'util'

import {
  EnrichedExceptionError,
  isEnrichedExceptionError,
  isGenericError,
  isGenericStringError,
  isHttpException,
  isRpcException,
  isSerializedEnrichedExceptionError,
  isSerializedError
} from './interfaces'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  protected logger = new Logger(this.constructor.name)

  constructor (private readonly moduleRef: ModuleRef) {}

  static payload (exception: unknown): EnrichedExceptionError {
    if (isEnrichedExceptionError(exception)) {
      return exception
    } else if (isHttpException(exception)) {
      return new EnrichedExceptionError({
        ...exception,
        statusCode: exception.getStatus()
      })
    } else if (isRpcException(exception)) {
      return new EnrichedExceptionError({ ...exception })
    } else if (isSerializedEnrichedExceptionError(exception)) {
      return new EnrichedExceptionError(exception)
    } else if (isSerializedError(exception)) {
      return new EnrichedExceptionError(exception.error)
    } else if (isGenericError(exception)) {
      return new EnrichedExceptionError({
        error: exception,
        message: exception.message,
        stack: exception.stack
      })
    } else if (isGenericStringError(exception)) {
      return new EnrichedExceptionError({
        error: Error.name,
        message: exception
      })
    }

    return new EnrichedExceptionError({
      message: 'Can not handle given error payload.',
      error: exception
    })
  }

  static log (logger: Logger, payload: EnrichedExceptionError): void {
    if (payload?.stack) {
      logger.debug(['%s[%s] - "%s"%s%s', payload.service ? `[${payload.service}] ` : '', payload.statusCode, payload.message, EOL, payload.stack])

      return
    }

    logger.verbose(['%s[%s] - "%s"', payload.service ? `[${payload.service}] ` : '', payload.statusCode, payload.message])
  }

  catch (exception: Error, host: ArgumentsHost): void | HttpException | Observable<RpcException> {
    if (this.shouldIgnore(exception)) {
      return
    }

    const ctxType = host.getType<ContextType | GqlContextType>()

    const payload = this.payload(exception)

    this.log(payload)

    switch (ctxType) {
    case 'rpc':
      return this.handleRpc(host, payload)

    case 'graphql':
      return this.handleGraphQL(host, payload)

    case 'http':
      return this.handleHttp(host, payload)

    default:
      throw new InternalServerErrorException(format('Can not handle ctx: %s', ctxType))
    }
  }

  // ignore some errors that you do not want to log
  protected shouldIgnore (exception: Error): boolean {
    if (!isGenericError(exception)) {
      return false
    }

    const ignored = ['favicon.ico']

    if (exception.message) {
      return ignored.some((err) => exception.message.match(err))
    }

    return false
  }

  protected payload (exception: unknown): EnrichedExceptionError {
    return GlobalExceptionFilter.payload(exception)
  }

  protected log (payload: EnrichedExceptionError): void {
    return GlobalExceptionFilter.log(this.logger, payload)
  }

  protected handleHttp (host: ArgumentsHost, payload: EnrichedExceptionError): void {
    const httpAdapterHost = this.moduleRef.get(HttpAdapterHost, { strict: false })

    const ctx = host.switchToHttp()

    delete payload.stack

    // goes crazy with missing fields when passing the class itself since then it acts as DTO?
    httpAdapterHost.httpAdapter.reply(ctx.getResponse(), { ...payload }, payload.statusCode)
  }

  protected handleGraphQL (_host: ArgumentsHost, payload: EnrichedExceptionError): HttpException {
    delete payload.stack

    return new HttpException(payload, payload.statusCode)
  }

  protected handleRpc (host: ArgumentsHost, payload: EnrichedExceptionError): Observable<RpcException> {
    const context = host.switchToRpc().getContext()

    // rmq context
    if (context.args?.length === 3 && 'fields' in context.args.at(0)) {
      payload.service = [context.args.at(0).fields.routingKey, context.args.at(2)].join(':')
    }

    return throwError(() => payload)
  }
}
