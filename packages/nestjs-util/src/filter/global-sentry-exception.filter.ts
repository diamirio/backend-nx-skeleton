import type { ArgumentsHost, ExceptionFilter, OnApplicationShutdown } from '@nestjs/common'
import { Catch } from '@nestjs/common'
import type { FastifyReply } from 'fastify'

// please do not use static imports from @sentry here, as it's an optional dependency of the module
import { ConfigService } from '../provider'
import { GlobalExceptionFilter } from './global-exception.filter'

@Catch()
export class GlobalSentryExceptionFilter extends GlobalExceptionFilter implements ExceptionFilter, OnApplicationShutdown {
  private sentry
  private initialized = false
  private readonly options? = ConfigService.get('sentry')

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

    // dynamically import sentry if available. typing has been omitted to avoid additional static imports
    try {
      this.sentry = require('@sentry/node')
    } catch (e) {
      this.logger.warn('Please install @sentry/node as dependency in your project.')
      this.logger.warn('Reporting to sentry.io will remain disabled...')

      return
    }

    try {
      const integrations: any[] = [
        new this.sentry.Integrations.OnUncaughtException({
          onFatalError: async (error): Promise<void> => {
            if (error.name === 'SentryError') {
              this.logger.warn(`SentryError: ${JSON.stringify(error, null, 2)}`)
            } else {
              this.sentry.getCurrentHub()?.getClient()?.captureException(error)
            }
          }
        }),
        new this.sentry.Integrations.OnUnhandledRejection({ mode: 'warn' })
      ]

      this.sentry.init({
        ...this.options,
        integrations
      })
    } catch (e) {
      this.logger.warn('Sentry.io initialization failed: ' + e.toString())
      this.logger.warn('Reporting to sentry.io will remain disabled...')

      return
    }

    this.initialized = true
    this.logger.log('Sentry.io initialized successfully. Uncaught exceptions will be reported...')
  }

  catch (exception: Error, host: ArgumentsHost): void {
    super.catch(exception, host)

    if (!this.initialized) {
      this.logger.warn('Reporting to sentry.io disabled. Please check if sentry was initialized correctly on startup.')

      return
    }

    const ctx = host.switchToHttp()
    const response: FastifyReply = ctx.getResponse()

    // only report unhandled exceptions identified as such by base handler
    if (!this.options?.reportAll && response?.statusCode < 500) {
      return
    }

    try {
      this.sentry.captureException(exception)
    } catch (sentryException) {
      this.logger.warn(`Sentry error: ${JSON.stringify(sentryException.message, null, 2)}`)
    }
  }

  async onApplicationShutdown (): Promise<void> {
    await this.sentry.close()
  }
}
