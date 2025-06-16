import { Catch } from '@nestjs/common'
import type * as SentryNode from '@sentry/node'

import { AbstractExceptionFilter } from './abstract-exception.filter'
import type { AbstractError, AbstractErrorOptions } from './interface'
import { SentryOptions } from './interface/sentry-options.interface'

type GlobalExceptionFilterOptions = AbstractErrorOptions & { sentry?: SentryOptions }
type GlobalError = Error & { statusCode?: number; service?: string }
type Sentry = typeof SentryNode

@Catch()
export class GlobalExceptionFilter extends AbstractExceptionFilter<GlobalError, GlobalExceptionFilterOptions> {
  defaultOptions(): GlobalExceptionFilterOptions {
    return {
      logging: true,
      printStack: true,
      sentry: {
        enable: false,
        dsn: undefined,
        environment: undefined,
        minStatusCode: 500
      }
    }
  }

  payload(exception: GlobalError): AbstractError {
    let response: AbstractError = {
      message: exception.message
    }

    // to be used with `nestjs-util-microservice`
    if (exception.service) {
      response = {
        ...response,
        ...exception
      }
    }

    return response
  }

  formatLogMessage(exception: GlobalError): string {
    return `${exception.service ? `[${exception.service}]` : `${exception.name}:`} ${exception.message}`
  }

  // SENTRY
  protected postConstructorHook(): void {
    if (!this.options.sentry?.enable) {
      return
    }

    this.logger.log('Setting up sentry for reporting errors')

    let sentry: Sentry

    try {
      sentry = require('@sentry/node')
    } catch (_) {
      this.logger.warn(
        'Sentry option enabled, but @sentry/node not installed as dependency in the project. Reporting will remain disabled...'
      )

      return
    }

    if (!this.options.sentry.dsn) {
      this.logger.warn('Sentry-Config is missing `dsn`. Reporting will remain disabled...')

      return
    }

    this.options.sentry.environment ??= `${process.env?.PACKAGE_NAME ? `${process.env?.PACKAGE_NAME}_` : ''}${process.env?.NODE_ENV ?? 'any'}`

    sentry.init({
      dsn: this.options.sentry.dsn,
      environment: this.options.sentry.environment
    })
    this.store.sentry = sentry
  }

  protected async preResponseHook(exception: GlobalError): Promise<void> {
    if (!(this.options.sentry?.enable && this.store.sentry)) {
      return
    }

    if (exception.statusCode >= this.options.sentry.minStatusCode) {
      const traceId = (this.store.sentry as Sentry).captureException(exception)

      this.logger.verbose(`Pushed error to sentry, trace-id: ${traceId}`)
    }
  }
}
