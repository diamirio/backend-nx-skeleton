import type { RmqOptions } from '@nestjs/microservices'

export interface ProviderOptions {
  urls: string[]
  clientOptions?: Partial<Omit<RmqOptions['options'], 'urls'>>
  global?: boolean
  timeout?: number
  timeoutErrorFactory?: (queue: string, pattern: string) => Error
  responseErrorFactory?: (queue: string, pattern: string, error: any) => Error
}
