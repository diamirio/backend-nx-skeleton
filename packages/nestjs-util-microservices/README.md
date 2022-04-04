<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

# @webundsoehne/nestjs-util-microservices

[![Version](https://img.shields.io/npm/v/@webundsoehne/nestjs-util-microservices.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util-microservices) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nestjs-util-microservices.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util-microservices) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nestjs-util-microservices)](https://npmjs.org/package/@webundsoehne/nestjs-util-microservices) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Description

This is a collection of useful modules on creating a [Nest](https://github.com/nestjs/nest) project. Mostly all of these modules are used by the in-house boilerplate of Web & Söhne.

## Modules

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Filters](#filters)
  - [RPC Global Exception](#rpc-global-exception)
- [Modules](#modules)
  - [Microservice-Client Provider](#microservice-client-provider)
- [Stay in touch](#stay-in-touch)

<!-- tocstop -->

## Filters

### RPC Global Exception

This filter will handle errors from microservices. If you use `GlobalExceptionFilter` on front of it will format the errors in the same way as the RESTFUL API and you can also throw `HTTP_STATUS` exceptions. This filter will also output which microservice this error is coming from for convienece of debugging.

**Usage**

```typescript
import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { GlobalExceptionFilter } from '@webundsoehne/nestjs-util'
import { RpcGlobalExceptionFilter } from '@webundsoehne/nestjs-util/dist/microservices'

@Module({
    providers: [
      {
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter
      },
      {
        provide: APP_FILTER,
        useClass: RpcGlobalExceptionFilter
      }
    ],
    imports: [ ...Object.values(modules) ]
  })
  class MicroservicesModule implements NestModule {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async configure (): Promise<any> {}
  }

  return MicroservicesModule
}
```

## Modules

### Microservice-Client Provider

Microservice client provider is a way to provide multiple microservice clients globally as well as accessing them through one common service with auto-typing to make things more convenient.

**Currently only supports RabbitMQ out-of-the-box.**

**Usage**

- Create your own types for message queue names, patterns and request-response maps in a common-package that is accessible for every service in monorepo.

  - Define queue names.

  ```typescript
  // microservice-provider.constants.ts
  export enum MessageQueues {
    MOCK_QUEUE = 'MOCK_QUEUE'
  }
  ```

  - Define message patterns for given queue.

  ```typescript
  // patterns/some-queue.pattern.ts
  export enum MockPattern {
    MOCK_DEFAULT = 'mock'
  }
  ```

  - Define message request-response maps for given message patterns.

  ```typescript
  // interfaces/some-queue.interface.ts
  import { MockPattern } from '../patterns'

  import { MicroserviceProviderBaseMessage, BaseMessageIndexes } from '@webundsoehne/nestjs-util/dist/microservices'

  // we need this base message indexes because of typescript indexing enum problem.
  export declare class MockMessage extends BaseMessageIndexes implements MicroserviceProviderBaseMessage<AppPattern> {
    [MockPattern.MOCK_DEFAULT]: {
      response: any | never
      request: any | never
    }
  }
  ```

  or in function form

  ```typescript
  // interfaces/some-queue.interface.ts
  import { MockPattern } from '../patterns'

  import { MicroserviceProviderBaseMessage, BaseMessageIndexes } from '@webundsoehne/nestjs-util/dist/microservices'

  // we need this base message indexes because of typescript indexing enum problem.
  export declare class MockMessage extends BaseMessageIndexes implements MicroserviceProviderBaseMessage<AppPattern> {
    [MockPattern.MOCK_DEFAULT]: (o: any) => any
  }
  ```

  - Put the message patterns in to maps to match the patterns and request-responses to queues.

  ```typescript
  // microservice-provider.constants.ts
  import { MockMessage } from './interfaces'
  import { MockPattern } from './patterns'
  import { BaseMessageQueueMap, BaseMessageQueuePatterns } from '@webundsoehne/nestjs-util/dist/microservices'

  export declare class MessageQueuePatterns implements BaseMessageQueuePatterns<MessageQueues> {
    [MessageQueues.MOCK_QUEUE]: MockPattern
  }

  export declare class MessageQueueMap implements BaseMessageQueueMap<MessageQueues> {
    [MessageQueues.MOCK_QUEUE]: MockMessage
  }
  ```

  - Create your helper types for convenience from generics to not fill out the generics every time.

  ```typescript
  // microservice-provider.interface.ts
  import { MessageQueues, MessageQueuePatterns, MessageQueueMap } from './microservice-provider.constants'
  import { MicroserviceProviderService } from '@webundsoehne/nestjs-util/dist/microservices'

  /**
   * Helper type for microservice client.
   */
  export type MicroserviceClient = MicroserviceProviderService<MessageQueues, MessageQueuePatterns, MessageQueueMap>

  /**
   * Helper type for microservice requests.
   */
  export type MicroserviceRequest<Queue extends MessageQueues, Pattern extends MessageQueuePatterns[Queue]> = MessageQueueMap[Queue][Pattern]['request']

  /**
   * Helper type for microservice responses.
   */
  export type MicroserviceResponse<Queue extends MessageQueues, Pattern extends MessageQueuePatterns[Queue]> = MessageQueueMap[Queue][Pattern]['response']
  ```

  - You can utilize these helper types in two ways in your microservice-server or directly without going through the maps.

  ```typescript
  import { Controller } from '@nestjs/common'
  import { MessagePattern } from '@nestjs/microservices'

  import { DefaultMicroservice } from './default.service'

  import { AppPattern, MicroserviceRequest, MicroserviceResponse, MessageQueues } from '@my-scope/my-common-package'

  @Controller()
  export class DefaultMicrocontroller {
    constructor(private readonly defaultMicroservice: DefaultMicroservice) {}

    @MessagePattern(AppPattern.APP_DEFAULT)
    public default(options: MicroserviceRequest<MessageQueues.APP_QUEUE, AppPattern.APP_DEFAULT>): Promise<MicroserviceResponse<MessageQueues.APP_QUEUE, AppPattern.APP_DEFAULT>> {
      return this.defaultMicroservice.default(options)
    }
  }
  ```

  ```typescript
  import { Controller } from '@nestjs/common'
  import { MessagePattern } from '@nestjs/microservices'

  import { DefaultMicroservice } from './default.service'
  import { AppMessage, AppPattern } from '@my-scope/my-common-package'

  @Controller()
  export class DefaultMicrocontroller {
    constructor(private readonly defaultMicroservice: DefaultMicroservice) {}

    @MessagePattern(AppPattern.APP_DEFAULT)
    public default(options: AppMessage[AppPattern.APP_DEFAULT]['request']): Promise<AppMessage[AppPattern.APP_DEFAULT]['response']> {
      return this.defaultMicroservice.default(options)
    }
  }
  ```

- Import the module itself and since the current default is RMQ, pass in the which queues you want to connect for this instance.

```typescript
import { MicroserviceProviderModule } from '@webundsoehne/nestjs-util/dist/microservices'

@Module({
  imports: [MicroserviceProviderModule.forRoot({ queue: [...THE_QUEUES_YOU_WANT_TO_IMPORT] })]
})
export class ServerModule {}
```

- This will automatically create a client service, `MicroserviceProviderService`, with the specified clients embedded inside.

- Then you can use the client in any service by injecting it. Everything will be autotyped if you use the helper type as well.

  - You can inject client service through its class.

  ```typescript
  import { MicroserviceClient, MicroserviceResponse, MicroserviceProviderService } from '@my-scope/my-common-package'
  import { Injectable, Inject } from '@nestjs/common'

  @Injectable()
  export class DefaultService {
    constructor(@Inject(MicroserviceProviderService) private readonly msp: MicroserviceClient) {}

    public default(): Promise<MicroserviceResponse<queue, pattern>> {
      return this.msp.send(queue, pattern, payload)
    }
  }
  ```

  - You can inject client service with a token of your choice that you can define while initializing the module.

  ```typescript
  // the service
  import { MicroserviceClient, MicroserviceResponse } from '@my-scope/my-common-package'
  import { Injectable, Inject } from '@nestjs/common'

  @Injectable()
  export class DefaultService {
    constructor(@Inject('MY_CLIENT_TOKEN') private readonly msp: MicroserviceClient) {}

    public default(): Promise<MicroserviceResponse<queue, pattern>> {
      return this.msp.send(queue, pattern, payload)
    }
  }
  ```

  ```typescript
  // the global module
  import {  MicroserviceProviderModule } from '@webundsoehne/nestjs-util/dist/microservices'

  @Module({
    name: 'MY_CLIENT_TOKEN'
    imports: [
        MicroserviceProviderModule.forRoot({ queue: [ ...THE_QUEUES_YOU_WANT_TO_IMPORT ] }),
        ]
    })
  export class ServerModule {}
  ```

## Stay in touch

- Author: [Backend Team](mailto:backend@webundsoehne.com)
- Website: [Web & Söhne](https://webundsoehne.com)
