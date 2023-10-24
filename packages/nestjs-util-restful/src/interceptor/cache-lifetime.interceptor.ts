import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { CacheLifetimeOptions } from './cache-lifetime.interface'
import type { Request } from '@webundsoehne/nestjs-util'
import { ConfigParam, Configurable } from '@webundsoehne/nestjs-util'

export class CacheLifetimeHelperInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)
  private readonly options: CacheLifetimeOptions

  constructor () {
    this.options = this.getOptionsFromConfig()
  }

  @Configurable()
  getOptionsFromConfig (@ConfigParam('cacheLifetime') cacheLifetimeOptions?: CacheLifetimeOptions): CacheLifetimeOptions {
    return cacheLifetimeOptions
  }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()

    const request: Request = httpContext.getRequest()
    const response: any = httpContext.getResponse()

    if (!request.state) {
      request.state = {}
    }

    request.state.setCacheLifetime = (lifetime: number, useExpiresHeader = this.options.defaultExpiresHeader): void => {
      request.state.caching = { lifetime, useExpiresHeader }
    }

    return next.handle().pipe(
      tap(() => {
        if (!request.state.caching && this.options.defaultLifetime) {
          request.state.setCacheLifetime(this.options.defaultLifetime, this.options.defaultExpiresHeader)
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore <- "known" ts issue with || {}
        const { lifetime, useExpiresHeader } = request.state.caching || {}

        if (lifetime && !isNaN(lifetime) && lifetime > 0) {
          const headerName = useExpiresHeader ? this.options.expiresHeader : this.options.cacheControlHeader

          const value = useExpiresHeader ? new Date(Date.now() + lifetime * 1000).toUTCString() : `max-age=${lifetime}`

          this.logger.verbose(['Cache lifetime is %dsec -> setting "%s" to %s', lifetime, headerName, value])

          response.headers.append(headerName, value)
        } else {
          this.logger.debug('No cache lifetime set.')
        }
      })
    )
  }
}
