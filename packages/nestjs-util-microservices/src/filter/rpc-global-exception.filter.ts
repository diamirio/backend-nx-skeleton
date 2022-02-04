import type { ArgumentsHost, RpcExceptionFilter } from '@nestjs/common'
import { Catch, HttpException, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { throwError } from 'rxjs'

import { EnrichedExceptionError, GlobalExceptionFilter } from '@webundsoehne/nestjs-util'
import type { EnrichedException } from '@webundsoehne/nestjs-util'
import { logErrorDebugMsg } from '@webundsoehne/nestjs-util/dist/filter/util'

@Catch(HttpException, RpcException)
export class RpcGlobalExceptionFilter implements RpcExceptionFilter {
  private logger = new Logger(this.constructor.name)

  static defaultPayload (exception: RpcException | HttpException, host: ArgumentsHost): EnrichedException {
    return new EnrichedExceptionError({
      ...GlobalExceptionFilter.defaultPayload(exception),
      service: host
        .switchToRpc()
        .getContext()
        .args.map((args) => args.fields?.routingKey)
        .filter(Boolean)
    })
  }

  catch (exception: RpcException | HttpException, host: ArgumentsHost): any {
    const payload = this.payload(exception, host)

    logErrorDebugMsg(this.logger, payload, exception.stack)

    return throwError(() => payload)
  }

  protected payload (exception: RpcException | HttpException, host: ArgumentsHost): EnrichedException {
    return RpcGlobalExceptionFilter.defaultPayload(exception, host)
  }
}
