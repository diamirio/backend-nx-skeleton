import type { ArgumentsHost, ExceptionFilter, OnApplicationShutdown } from '@nestjs/common'
import { Catch } from '@nestjs/common'
import * as Sentry from '@sentry/node'
import type { Integration, Options } from '@sentry/types'
import type { FastifyReply } from 'fastify'

import { ConfigService } from '../provider'
import { GlobalExceptionFilter } from './global-exception.filter'

@Catch()
export class GlobalSentryExceptionFilter extends GlobalExceptionFilter implements ExceptionFilter, OnApplicationShutdown {
  private initialized = false
  private readonly options?: Options = ConfigService.get('sentry')

  constructor () {
    super()

    if (!this.options || !this.options?.dsn) {
      this.logger.warn(`${!this.options ? 'Missing' : 'Invalid'} sentry.io config: ${JSON.stringify(this.options, null, 2)}`)
      this.logger.warn('Reporting to sentry.io will remain disabled...')

      return
    }

    if (!this.options?.environment) {
      this.options.environment = `${process.env?.PACKAGE_NAME ? process.env?.PACKAGE_NAME + '_' : ''}${process.env?.NODE_ENV ?? 'any'}`
    }

    const integrations: Integration[] = [
      new Sentry.Integrations.OnUncaughtException({
        onFatalError: async (error): Promise<void> => {
          if (error.name === 'SentryError') {
            this.logger.warn(`SentryError: ${JSON.stringify(error, null, 2)}`)
          } else {
            Sentry.getCurrentHub()?.getClient()?.captureException(error)
          }
        }
      }),
      new Sentry.Integrations.OnUnhandledRejection({ mode: 'warn' })
    ]

    Sentry.init({
      ...this.options,
      integrations
    })
    this.initialized = true
    this.logger.log('Reporting to sentry.io initialized successfully')
  }

  catch (exception: Error, host: ArgumentsHost): void {
    super.catch(exception, host)

    const ctx = host.switchToHttp()
    const response: FastifyReply = ctx.getResponse()

    // only report unhandled exceptions identified as such by base handler
    if (response?.statusCode < 500) {
      return
    }

    if (!this.initialized) {
      this.logger.warn('Reporting to sentry.io disabled. Please check if sentry was initialized correctly on startup.')

      return
    }

    try {
      Sentry.captureException(exception)
    } catch (sentryException) {
      this.logger.warn(`Sentry error: ${JSON.stringify(sentryException.message, null, 2)}`)
    }
  }

  async onApplicationShutdown (): Promise<void> {
    await Sentry.close()
  }
}
