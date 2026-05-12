import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Injectable()
export class RequestProfilerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)

  requestProfilerLog(context: ExecutionContext, method: string, url: string, start: number, end: number): void {
    const httpContext = context.switchToHttp()
    const response: any = httpContext.getResponse()
    const statusCode = response.raw?.statusCode ?? response.statusCode ?? 500

    this.logger.log(`${method} ${url} finished - ${statusCode} - took: ${((end - start) / 1000).toFixed(3)} sec`)
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()
    const request: any = httpContext.getRequest()
    const url = request.raw?.url ?? request.url ?? ''
    const method = (request.raw?.method ?? request.method ?? '').toUpperCase()

    this.logger.log(`${method} ${url} starting...`)

    const start = Date.now()

    return next.handle().pipe(
      // setTimeout to push it on the callstack before an eventual error handler is called.
      // yeah... there are cleaner things. but it's the only way to get the right status code here.
      finalize(() => setTimeout(() => this.requestProfilerLog(context, method, url, start, Date.now()), 0))
    )
  }
}
