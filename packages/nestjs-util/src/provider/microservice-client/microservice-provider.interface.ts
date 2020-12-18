import { FactoryProvider } from '@nestjs/common'
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception'
import { ClientProxyFactory, RmqOptions } from '@nestjs/microservices'

export interface MicroserviceProviderModuleOptions {
  /** give a inject token of your desire  */
  name?: string | symbol
  /** queue names as string, will be autogenerated with the client module */
  queue: string[]
  /** if you want to override the default provider */
  provider?: (queue?: string[]) => FactoryProvider<ClientProxyFactory>[]
  /** client options, if you dont want to use default config.js key of messageQueue.clientOptions */
  clientOptions?: MicroserviceProviderClientOptions
  /** disable service itself, just provide the client */
  disableService?: boolean
}

export interface MicroserviceProviderServiceOptions {
  /** add timeout functionality to the message queue */
  timeout?: number
}

/**
 * Inject options for provider client configuration
 * Currently only supports options for RMQ
 */
export type MicroserviceProviderClientOptions = RmqOptions['options']

/**
 * This is the base format which a message queue maps for request responses can be supplied.
 */
// FIXME: this needs fixing but, but can not type the patterns without typescript going crazy
export type MicroserviceProviderBaseMessage<Pattern extends string | symbol | number> = {
  [K in Pattern]: MicroserviceProviderMessage
}

export interface MicroserviceProviderMessage {
  request: any | never
  response: any | never
}

/**
 * A timeout exception for message queue internally.
 */
export class TimeoutException extends RuntimeException {
  constructor (name: string) {
    super(`Request to service "${name}" timed out.`)
  }
}

/**
 * Shorthand for enum keys
 */
export type EnumKeys = string | symbol | number

/**
 * Type of a message queue patern thingy
 */
export type BaseMessageQueuePatterns<T extends EnumKeys> = Record<T, EnumKeys>

/**
 * Type of message queue map
 */
export type BaseMessageQueueMap<T extends EnumKeys> = Record<T, MicroserviceProviderBaseMessage<EnumKeys>>

/**
 * We need this guy for fixing the typescript problem.
 *
 * index for not to make typescript go crazy with indexing enums, huge problem
 *
 * https://github.com/Microsoft/TypeScript/issues/21987
 */
export class BaseMessageIndexes {
  [k: string]: MicroserviceProviderMessage
}
