# nestjs-microservice

## Description

RabbitMQ, NestJs-Microservice wrapper for easier microservice interaction.

Create the microservice-server as normal with NestJs (`createMicroservice`) and in the api (that interacts with that server) use this provider-utils.

---

<!-- TOC -->
* [nestjs-microservice](#nestjs-microservice)
  * [Description](#description)
  * [Microservice-Provider Module](#microservice-provider-module)
    * [Options](#options)
  * [Microservice-Provider](#microservice-provider)
  * [Interceptor](#interceptor)
* [Links](#links)
<!-- TOC -->

---

## Microservice-Provider Module

Register the provider that can be injected in any service to interact with the message-queue.<br>
The module is global by default.

```typescript
import { Module } from '@nestjs/common'
import { MicroserviceProviderModule } from '@diamir/nestjs-microservice'

import { ExampleProvider } from '@libs/microservice-provider'

@Module({
  imports: [
    MicroserviceProviderModule.forRoot({ urls: ['http://localhost:5672'] }, [ExampleProvider])
  ]
})
```

### Options

```typescript
{ // type: ProviderOptions
  urls // message-queue urls
  clientOptions // (optional) options passed to the underlying `ClientRMQ`
  global // (default: true) if module is imported globally, 
  timeout // (default: 10 minutes) time in milliseconds when a timeout error is thrown if operation not yet completed 
  timeoutErrorFactory // (optional) custom error on time-out
  responseErrorFactory // (optional) custom error on response error
}
```

## Microservice-Provider

To set up a new provider service, use the `@MSP()` decorator to define the MessageQueue to be used and extend the `BaseMicroserviceProvider`.<br>
In the service define/implement the methods to call the Message-Patterns of that queue.

Setup:
```typescript
// libs/microservice-provider/mesage-queue.enum.ts
enum MessageQueue { // used in nestjs `createMicroservice` options
  EXAMPLE = 'EXAMPLE'
}

// libs/microservice-provider/provider/example/example.pattern.ts
enum ExamplePattern { // used in nestjs `@MessagePattern(..)`
  COMMAND_A = 'COMMAND_B',
  COMMAND_B = 'COMMAND_B'
}

// libs/microservice-provider/provider/example/example.provider.ts
import { BaseMicroserviceProvider, MSP } from '@diamir/nestjs-microservice'

import { MessageQueue } from '../../message-queue.enum'
import { ExamplePattern } from './example.pattern'

@MSP(MessageQueue.EXAMPLE)
export class ExampleProvider extends BaseMicroserviceProvider<ExamplePattern> {
  commandA (options: { /* some data for command-a */ }): Promise<{ /* microservice response */ }> {
    return this.send(ExamplePattern.COMMAND_A, options)
  }

  // or without payload
  async commandB (): Promise<void> {
    await this.emit(ExamplePattern.COMMAND_B)
  }
}
```

Usage:
```typescript
// apps/example/server/modules/example/example.service.ts
@Injectable()
export class ExampleService {
  constructor(private readonly exampleProvider: ExampleProvider){}
  
  async example(): Promise<void> {
    await this.exampleProvider.commandB()
  }
}
```

## Interceptor

- `RequestProfilerInterceptor`: logs incoming request patterns and how long they took until their response

```typescript
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { RequestProfilerInterceptor } from '@diamir/nestjs-microservice'

// microservice server
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestProfilerInterceptor
    }
  ]
})
```

Example Output:
```text
[2020-01-01T12:00:00.000Z] [debug] [RequestProfilerInterceptor] - Pattern example starting
[2020-01-01T12:00:00.025Z] [debug] [RequestProfilerInterceptor] - Pattern example finished - took: 0.0250 sec
```

# Links
- [Diamir](https://diamir.io/)
- [nestjs](https://nestjs.com/)
