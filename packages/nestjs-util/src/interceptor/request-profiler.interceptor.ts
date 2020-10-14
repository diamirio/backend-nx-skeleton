import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Request } from '@interface'
import { getDuration } from '@util'

export class RequestProfilerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)

  public requestProfilerLog (method: string, url: string, start: number): void {
    this.logger.debug(`${method} ${url} finished - took: ${getDuration(start, Date.now()).toFixed(4)} sec`)
  }

  public intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()
    const request: Request = httpContext.getRequest()

    const url = request.raw.url || ''
    const method = String(request.raw.method || '').toUpperCase()

    this.logger.debug(`${method} ${url} starting`)

    const start = Date.now()

    return next.handle().pipe(finalize(() => this.requestProfilerLog(method, url, start)))
  }
}
