import type { ArgumentsHost, RpcExceptionFilter, HttpException } from '@nestjs/common'
import { Catch, Logger } from '@nestjs/common'
import type { RpcException } from '@nestjs/microservices'
import { throwError } from 'rxjs'

import { EnrichedExceptionError, GlobalExceptionFilter } from '@webundsoehne/nestjs-util'
import type { EnrichedException } from '@webundsoehne/nestjs-util'

@Catch()
export class RpcGlobalExceptionFilter implements RpcExceptionFilter {
  private logger = new Logger(this.constructor.name)

  static defaultPayload (exception: RpcException | HttpException | Error, host: ArgumentsHost): EnrichedException {
    return new EnrichedExceptionError({
      ...GlobalExceptionFilter.defaultPayload(exception),
      service: host
        .switchToRpc()
        .getContext()
        .args.map((args) => args.fields?.routingKey)
        .filter(Boolean)
    })
  }

  catch (exception: RpcException | HttpException | Error, host: ArgumentsHost): any {
    const payload = this.payload(exception, host)

    GlobalExceptionFilter.debug(this.logger, payload)

    return throwError(() => payload)
  }

  protected payload (exception: RpcException | HttpException | Error, host: ArgumentsHost): EnrichedException {
    return RpcGlobalExceptionFilter.defaultPayload(exception, host)
  }
}
