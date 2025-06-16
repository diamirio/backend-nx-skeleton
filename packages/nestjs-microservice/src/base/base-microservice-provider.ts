import {
  Inject,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
  RequestTimeoutException
} from '@nestjs/common'
import { ClientRMQ } from '@nestjs/microservices'
import { asyncScheduler, catchError, firstValueFrom, type Observable, throwError, timeout } from 'rxjs'

import { ProviderOptions } from '../interface/provider-options.interface'
import { PROVIDER_OPTIONS } from '../provider.constants'

export abstract class BaseMicroserviceProvider<Pattern extends string> implements OnModuleInit, OnModuleDestroy {
  queue: string

  protected options: ProviderOptions
  protected clientProxy: ClientRMQ

  constructor(@Inject(PROVIDER_OPTIONS) options: ProviderOptions) {
    this.queue = Reflect.get(this.constructor, 'queue')
    this.options = options
  }

  onModuleInit(): void {
    this.clientProxy = new ClientRMQ({
      ...(this.options.clientOptions ?? {}),
      queue: this.queue
    })
  }

  async onModuleDestroy(): Promise<void> {
    await this.clientProxy.close()
  }

  protected sendRaw<P, R>(pattern: Pattern, payload?: P): Observable<R> {
    return this.clientProxy.send(pattern, payload ?? {})
  }

  protected emitRaw<P, R>(pattern: Pattern, payload?: P): Observable<R> {
    return this.clientProxy.emit(pattern, payload ?? {})
  }

  protected async send<P, R>(pattern: Pattern, payload?: P): Promise<R> {
    return this.promisify(this.sendRaw(pattern, payload ?? ({} as any)), pattern)
  }

  protected async emit<P, R>(pattern: Pattern, payload?: P): Promise<R> {
    return this.promisify(this.emitRaw(pattern, payload ?? ({} as any)), pattern)
  }

  protected timeoutException(pattern: Pattern) {
    return (
      this.options.timeoutErrorFactory?.(this.queue, pattern) ??
      new RequestTimeoutException(`${this.queue}#${String(pattern)} timed out`)
    )
  }

  protected responseException(pattern: Pattern, error: any) {
    return (
      this.options.responseErrorFactory?.(this.queue, pattern, error) ??
      new InternalServerErrorException(`${this.queue}#${String(pattern)} failed: ${error.message ?? error.err?.code}`, {
        cause: error
      })
    )
  }

  private promisify<R>(source: Observable<R>, pattern: Pattern): Promise<R> {
    const timeoutError = throwError(() => this.timeoutException(pattern))
    const responseError = (error: any) => throwError(() => this.responseException(pattern, error))

    return firstValueFrom(
      source.pipe(
        timeout({
          first: this.options.timeout ?? 10 * 60e3,
          with: () => timeoutError,
          scheduler: asyncScheduler
        }),
        catchError((error) => responseError(error))
      )
    )
  }
}
