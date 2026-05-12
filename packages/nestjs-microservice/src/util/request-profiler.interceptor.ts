import { type CallHandler, type ExecutionContext, Injectable, Logger, type NestInterceptor } from '@nestjs/common'
import { type RmqContext } from '@nestjs/microservices'
import { finalize, type Observable } from 'rxjs'

const logPattern = (logger: Logger, pattern: string, end?: number): void => {
  if (!end) {
    logger.debug(`Pattern ${pattern} starting`)
  } else {
    logger.debug(`Pattern ${pattern} finished - took ${end} ms`)
  }
}

@Injectable()
export class RequestProfilerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const c: RmqContext = context.switchToRpc().getContext()
    const pattern = c.getPattern()
    const start = Date.now()

    logPattern(this.logger, pattern)

    return next.handle().pipe(
      finalize(() => {
        logPattern(this.logger, pattern, Date.now() - start)
      })
    )
  }
}
