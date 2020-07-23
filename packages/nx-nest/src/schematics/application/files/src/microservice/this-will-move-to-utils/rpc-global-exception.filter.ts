import { Catch, HttpException, Logger, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { EnrichedHttpException, getErrorMessage } from '@webundsoehne/nestjs-util'
import { Observable, throwError } from 'rxjs'

export type EnrichedRpcException = Omit<EnrichedHttpException, 'statusCode'> & { statusCode: string }

@Catch()
export class RpcGlobalExceptionFilter implements RpcExceptionFilter<RpcException> {
  private logger = new Logger(this.constructor.name)

  catch (exception: RpcException): Observable<EnrichedRpcException> {
    const payload = this.payload(exception)
    this.logger.debug(`[${payload.status}] - "${getErrorMessage(exception.message)}" \n${exception.stack}`)

    return throwError(payload)
  }

  protected defaultPayload (exception: RpcException | HttpException): EnrichedRpcException {
    return {
      statusCode: exception.name,
      error: exception.message,
      message: getErrorMessage(exception)
    }
  }

  protected payload (exception: RpcException | HttpException): EnrichedRpcException {
    return this.defaultPayload(exception)
  }
}
