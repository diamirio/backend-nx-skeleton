import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { ClientProviderOptions, ClientProxy } from '@nestjs/microservices'
import { asyncScheduler, throwError } from 'rxjs'
import { timeoutWith } from 'rxjs/operators'

import {
  GetMicroserviceMessageRequestFromMap,
  GetMicroserviceMessageResponseFromMap,
  MicroserviceProviderServiceOptions,
  TimeoutException
} from './microservice-provider.interface'
import { ConfigService } from '@provider/config/config.service'

/**
 * You have to supply the types for MessageQueue enum, MessageQueuePatterns available for all queues and the map of request response types
 * that is expanded from MicroserviceProviderBaseMessage
 */
@Injectable()
export class MicroserviceProviderService<
  MessageQueues extends string = any,
  MessageQueuePatterns extends Record<MessageQueues, any> = any,
  MessageQueueMap extends Record<MessageQueues, any> = any
> implements OnApplicationBootstrap {
  private clients: Record<MessageQueues, ClientProxy>
  private options: Required<MicroserviceProviderServiceOptions>

  constructor (private readonly provider: ClientProviderOptions[], private readonly names: MessageQueues[]) {
    const options = ConfigService.get('messageQueue')?.serviceOptions
    this.options = {
      // default timeout is 1 hours
      timeout: 3600000,
      ...options
    }
  }

  public onApplicationBootstrap (): void {
    this.clients = (this.provider.reduce((o, c, i) => {
      // this seems to be the only relaible way to inject the client names here
      o[this.names[i]] = c
      return o
    }, {} as Record<string, unknown>) as unknown) as Record<MessageQueues, ClientProxy>
  }

  // FIXME: this guys causes problems when typing the message request-respond types itself. only making the map a string map works.
  // generic enum can also be symbol so you can not address object with it, cause of tserror
  public async send<
    Queue extends MessageQueues,
    Pattern extends MessageQueuePatterns[Queue],
    Payload extends GetMicroserviceMessageRequestFromMap<Pattern, MessageQueueMap[Queue]>,
    ReturnValue extends GetMicroserviceMessageResponseFromMap<Pattern, MessageQueueMap[Queue]>
  >(
    queue: Queue,
    pattern: Pattern,
    payload: Payload,
    options?: MicroserviceProviderServiceOptions
  ): Promise<ReturnValue> {
    return this.execute('send', queue, pattern, payload, options)
  }

  public async emit<
    Queue extends MessageQueues,
    Pattern extends MessageQueuePatterns[Queue],
    Payload extends GetMicroserviceMessageRequestFromMap<Pattern, MessageQueueMap[Queue]>,
    ReturnValue extends GetMicroserviceMessageResponseFromMap<Pattern, MessageQueueMap[Queue]>
  >(
    queue: Queue,
    pattern: Pattern,
    payload: Payload,
    options?: MicroserviceProviderServiceOptions
  ): Promise<ReturnValue> {
    return this.execute('emit', queue, pattern, payload, options)
  }

  private async execute<
    Queue extends MessageQueues,
    Pattern extends MessageQueuePatterns[Queue],
    Payload extends GetMicroserviceMessageRequestFromMap<Pattern, MessageQueueMap[Queue]>,
    ReturnValue extends GetMicroserviceMessageResponseFromMap<Pattern, MessageQueueMap[Queue]>
  >(
    command: 'send' | 'emit',
    queue: Queue,
    pattern: Pattern,
    payload?: Payload,
    options?: MicroserviceProviderServiceOptions
  ): Promise<ReturnValue> {
    const o = { ...this.options, ...options }

    // it does not like ?.[]
    if (!this.clients || !this.clients[queue]) {
      throw new Error(
        `"${queue}" is not available in the context of this provider. Please check MicroserviceProviderModule.forRoot inputs and message queue connection.`
      )
    }

    return this.clients[queue][command](pattern, payload)
      .pipe(timeoutWith(o.timeout, throwError(new TimeoutException(queue)), asyncScheduler))
      .toPromise()
  }
}
