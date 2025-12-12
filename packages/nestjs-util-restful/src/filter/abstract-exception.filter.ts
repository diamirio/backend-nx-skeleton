import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { HttpException, HttpStatus, Inject, Logger, Optional } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import { ERROR_OPTIONS } from './constants'
import { ErrorFormatter } from './formatter/abstract-error-formatter'
import type { AbstractError, AbstractErrorOptions, ErrorPayload } from './interface'

export abstract class AbstractExceptionFilter<
  E extends Error = Error,
  O extends AbstractErrorOptions = AbstractErrorOptions
> implements ExceptionFilter<E>
{
  protected readonly logger: Logger = new Logger(this.constructor.name)
  protected options: Partial<O>
  protected store: Record<string, unknown> = {} // optional store for e.g. dependency instances

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Optional() @Inject(ERROR_OPTIONS) errorOptions?: Record<string, Partial<O>>,
    @Optional() @Inject(ErrorFormatter) private readonly formatter?: ErrorFormatter<unknown>
  ) {
    this.options = Object.assign({}, this.defaultOptions(), errorOptions?.[this.optionKey()] ?? {})
    this.postConstructorHook()
  }

  async catch(exception: E & { cause?: E }, host: ArgumentsHost): Promise<void> {
    exception.name ??= 'Error'

    if (this.options.logging) {
      this.logger.error(this.formatLogMessage(exception), this.options.printStack ? exception.stack : undefined)

      if (exception.cause) {
        this.logger.error(
          `Caused by: ${exception.cause.message}`,
          this.options.printStack ? exception.cause.stack : undefined
        )
      }
    }

    const payload: ErrorPayload = Object.assign(
      this.isHttpException(exception) ? exception.getResponse() : {},
      this.payload(exception)
    ) as ErrorPayload

    payload.message ??= exception.name ?? ''
    payload.statusCode ??= this.errorCode(exception)
    payload.error ??= exception.name ?? 'Error'

    await this.preResponseHook(exception, payload)

    if (this.formatter) {
      this.httpAdapterHost.httpAdapter.setHeader(
        host.switchToHttp().getResponse(),
        'content-type',
        this.formatter.getContentType()
      )
    }

    await this.httpAdapterHost.httpAdapter.reply(
      host.switchToHttp().getResponse(),
      this.formatter ? this.formatter.format(payload) : payload,
      this.errorCode(exception) ?? HttpStatus.INTERNAL_SERVER_ERROR
    )
  }

  /**
   * The log-message to be printed if logging is enabled in the options
   * @param {E} exception
   * @return {string}
   * @protected
   */
  protected formatLogMessage(exception: E): string {
    return `${exception.name}: ${exception.message}`
  }

  /**
   * HELPER
   */
  /**
   * Type-Guard for HttpException
   * @param {any} exception
   * @return {boolean}
   * @protected
   */
  protected isHttpException(exception: any): exception is HttpException {
    return exception instanceof HttpException
  }

  /**
   * Http-/Error-/Status-Code of the response
   * @param {E} exception
   * @return {number}
   * @protected
   */
  protected errorCode(exception: E): number {
    return this.isHttpException(exception)
      ? exception.getStatus()
      : ((exception as any).statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR)
  }

  /**
   * returns the option object-key to pick from the ERROR_OPTIONS
   * @protected
   */
  protected optionKey(): string {
    return this.constructor.name
  }

  /**
   * used to trigger initializer after the constructor
   * @protected
   */
  protected postConstructorHook(): void {}

  /**
   * used to trigger sentry if enabled
   * @param {E} exception
   * @param {ErrorPayload} payload
   * @protected
   */
  // biome-ignore lint/correctness/noUnusedFunctionParameters: optional method
  protected async preResponseHook<P extends ErrorPayload>(exception: E, payload: P): Promise<void> {}

  /**
   * Set the default options for the exception-filter
   * Can be overwritten by the exception-filters constructor `options'
   * @return default option object
   * @abstract
   */
  abstract defaultOptions(): O

  /**
   * Transform exception into a unified error schema that will be returned to the user
   * @param {E} exception
   * @returns {AbstractError}
   * @abstract
   */
  abstract payload(exception: E): AbstractError
}
