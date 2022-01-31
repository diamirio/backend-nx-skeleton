import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

import type { Request } from '@interface'
import { getDuration } from '@util'

export class RequestProfilerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)

  public requestProfilerLog (context: ExecutionContext, method: string, url: string, start: number, end: number): void {
    const httpContext = context.switchToHttp()
    const response: Request = httpContext.getResponse()
    const statusCode = (response as any)?.statusCode ?? response?.raw?.statusCode ?? 'UNDEF'

    this.logger.log(`${method} ${url} finished - ${statusCode} - took: ${getDuration(start, end).toFixed(3)} sec`)
  }

  public intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()
    const request: Request = httpContext.getRequest()

    const url = request.raw.url || ''
    const method = String(request.raw.method || '').toUpperCase()

    this.logger.log(`${method} ${url} starting`)

    const start = Date.now()

    return next.handle().pipe(
      // setTimeout to push it on the callstack before an eventual error handler is called.
      // yeah... there are cleaner things. but it's the only way to get the right status code here.
      finalize(() => setTimeout(() => this.requestProfilerLog(context, method, url, start, Date.now()), 0))
    )
  }
}
