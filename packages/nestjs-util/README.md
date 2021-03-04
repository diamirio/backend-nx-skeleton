<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

# @webundsoehne/nestjs-util
===
[![Version](https://img.shields.io/npm/v/init-cli.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util)
[![Downloads/week](https://img.shields.io/npm/dw/init-cli.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util)

## Description

This is a collection of useful modules on creating a [Nest](https://github.com/nestjs/nest) project.
Mostly all of this modules are used by the in-house boilerplate of Web & Söhne.

## Publishing

This repository now uses conventional commits since it's monorepo structure. On matching commits that is related to this package, the source-code will be automatically transpiled and published to [NPM](https://www.npmjs.com/~ws-admin).

## Modules

- [Changelog](./CHANGELOG.md)

<!-- toc -->

  - [Internal](#internal)
    - [Status](#status)
    - [Changelog](#changelog)
  - [Maintenance](#maintenance)
    - [Locker](#locker)
    - [Middleware](#middleware)
  - [Info-Header](#info-header)
  - [Config](#config)
  - [Logger](#logger)
  - [Swagger](#swagger)
  - [Microservice-Client Provider](#microservice-client-provider)
  - [Decorators](#decorators)
    - [Validation Override](#validation-override)
  - [Pipes](#pipes)
    - [Validation Pipe](#validation-pipe)
  - [Exception-Filters](#exception-filters)
    - [Http](#http)
    - [Bad-Request](#bad-request)
    - [GraphQL Error Parser](#graphql-error-parser)
    - [RPC Global Exception](#rpc-global-exception)
  - [Cache-Lifetime](#cache-lifetime)
  - [Request-Profiler](#request-profiler)
- [Stay in touch](#stay-in-touch)

<!-- tocstop -->

### Internal

This is a NestJS controller module for internal API endpoints, which can simply be added to each project.
The controller provides you 2 endpoints `/status` and `/changelog`.

__Usage__

```
import { InternalModule } from '@webundsoehne/nestjs-util'

@Module({
  imports: [ InternalModule ]
})
class ServerModule implements NestModule {
  async configure (): Promise<any> {
    await setEnvironmentVariables()
  }
}
```

__Configuration__

Key                   | Type    | Default         | Description
--------------------- | ------- | --------------- | ------------
misc.changelogFile    | String  | 'CHANGELOG.md'  | The filepath of the project's changelog information
misc.lastUpdateFile   | String  | '.last-update'  | The filepath of the projects's last update file


#### Status

The status endpoint returns the current API version set during the process environment and the last modification of the `.last-update` in your root directory.
The version will be set with the util function `setEnvironmentVariables()` read from `package.json` and the file will normally be generated/modified during the deployment process.
You may change this value with the `misc.lastUpdateFile` configuration.

#### Changelog

This endpoint simply reads and response the `CHANGELOG.md` from your root directory.
You can change the filepath with the configuration value `misc.changelogFile`.


### Maintenance

The maintenance module gives you the possibility to generete and remove a lock file, as well as checking if the lock file exists and throwing a preconfigured `ServiceUnavailableException` error.
You may use the maintenance module anywhere in your project, e.g. for database migrations.

__Usage__

```
import { MaintenanceMiddleware, MaintenanceModule } from '@webundsoehne/nestjs-util'

@Module({
  imports: [ MaintenanceModule ]
})
class ServerModule implements NestModule {
  async configure (consumer: MiddlewareConsumer): Promise<any> {
    consumer
        .apply(MaintenanceMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
```

__Methods__

Name           | Return  | Description
-------------- | ------- | -----------
enable         | void    | Create the configured lock file
disable        | void    | Remove the generated lock file
isEnabled      | Boolean | Check if there is already a lock file
throwException | void    | Throw the preconfigured exception

__Configuration__

> If there is no `misc.maintenanceNotification` set, it will be generated with following template string:
> <br />\`${url.basePath} is currently down for maintenance\`

Key                            | Type    | Default            | Description
------------------------------ | ------- | ------------------ | ------------
url.basePath                   | String  |                    | The base API url of your project
misc.maintenanceNotification   | String  | (see hint above)   | The notification, which will be thrown in case of maintenance
misc.lockfile                  | String  | 'maintenance.lock' | The filepath of the projects's maintenance lock file

#### Locker

The maintenance locker can be used combined with the `nest-schedule` module for putting the API into maintenance mode programmatically while a background task executes.

__Usage__
```typescript
import { MaintenanceLocker } from '@webundsoehne/nestjs-util'
import { NestSchedule, Timeout, UseLocker } from 'nest-schedule'

@Injectable()
export class BgTask extends NestSchedule {

  @Timeout(0, {})
  @UseLocker(MaintenanceLocker)
  async bgTask (): Promise<void> {}
}
```


#### Middleware

The middleware of the maintenance module, uses directly the `MaintenanceService`, to check if there exists a lock file and raises the correct exception. You will see the implementation in the usage block above.

### Info-Header

The information header middleware is a really short `NestMiddleware` which set the `X-Api-Name` and `X-Api-Version` response header out of the `process.env` data.
Both environment variables will be set with the `setEnvironmentVariables` util function, which loads the information from the `package.json`.

__Usage__

```
import { SetApiInfoHeaderMiddleware, setEnvironmentVariables} from '@webundsoehne/nestjs-util'

class ServerModule implements NestModule {
  async configure (consumer: MiddlewareConsumer): Promise<any> {
    await setEnvironmentVariables()

    consumer
      .apply(SetApiInfoHeaderMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
```

### Config

This is a NestJS service, which allows you to uses the great [config](https://github.com/lorenwest/node-config) library with decorators.
But for scripts or in common no classes, you can use it normally too.

__Important__

> The `@Configurable()` has to be the last decorator before the function is initiated.

__Usage__

```
import { ConfigParam, ConfigService, Configurable, InjectConfig } from '@webundsoehne/nestjs-util'

// 1. the old (static) way
const configValue1 = ConfigService.get('value')

class CustomService {
  // 2. inject the whole config service, normally you wont use this ways
  constructor ( @InjectConfig() private readonly config: ConfigService) {
    const configValue2 = this.config.get('value')
  }

  // 3. load the config directly as function parameter
  @AnythingElse()
  @Configurable()
  testConfig (@ConfigParam('value', 'default-value') value3?: string) {
    ...
  }
}
```

### Logger

Customized logger service, which uses [winston](https://github.com/winstonjs/winston) for nicer output.

__Usage__

Set an instance of the logger to the application during creation, as part of the `NestApplicationOptions`.

```
import { LoggerService } from '@webundsoehne/nestjs-util'

const app = await NestFactory.create<INestApplication>(ServerModule, new FastifyAdapter(), {
  logger: new LoggerService()
})
```

After the logger got set to the application, all NestJS logging output, will be handled by our customized logger.

```
import { Logger } from '@nestjs/common'

class CustomService {
  private readonly logger: Logger = new Logger(this.constructor.name)
  private readonly loggerWithoutContext: Logger = new Logger()

  constructor () {
    this.logger.verbose('log message')
    // [2020-01-01T12:00:00.000Z] [verbose] [CustomService] - log message
    this.logger.verbose('log message, with custom context', 'ForcedContext')
    // [2020-01-01T12:00:00.000Z] [verbose] [ForcedContext] - log message, with custom context

    this.logger.loggerWithoutContext('log message')
    // [2020-01-01T12:00:00.000Z] [verbose] [LoggerService] - log message
    this.logger.loggerWithoutContext('log message, with custom context', 'ForcedContext')
    // [2020-01-01T12:00:00.000Z] [verbose] [ForcedContext] - log message, with custom context
  }
}

```

### Swagger

Automatically creates a Swagger documentation out of your controllers.
For detailed information about the how-to, take a deeper look at the Nest [documentation](https://docs.nestjs.com/recipes/swagger).

__Usage__

```
import { SwaggerService } from '@webundsoehne/nestjs-util'

const app = await NestFactory.create<INestApplication>(ServerModule, new FastifyAdapter())
SwaggerService.enable(app, options)
```

__Parameters__

Name    | Required | Type             | Description
------- | -------- | ---------------- | -----------
app     | true     | INestApplication | The Nest application on which the documentation should be created
options | false    | SwaggerOptions   | Options for customize the default created document
config  | false    | SwaggerConfig    | Standard configuration, which are required for creating a documentation

__Types__

*SwaggerOptions*

Name      | Required | Type     | Description
--------- | -------- | -------- | -----------
customize | false    | Function | This function takes an DocumentBuilder modifies and returns it

*SwaggerConfig*

Name        | Required | Type    | Description
----------- | -------- | ------- | -----------
useHttps    | true     | Boolean | If the API is behind SSL encryption
basePath    | true     | String  | The base-path of the API
path        | true     | String  | The sub-path to reach the API
title       | true     | String  | The name of the API or the customer
description | true     | String  | A description for the whole API


### Microservice-Client Provider
Microservice client provider is a way to provide multiple microservice clients globally as well as accesing them through one common service with auto-typing to make things more convienent.

**Currently only supports RabbitMQ out-of-the-box.**

__Usage__

- Create your own types for message queue names, patterns and request-response maps in a common-package that is accesible for every service in monorepo.
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
  - Create your helper types for convienence from generics to not fill out the generics everytime.
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
  export type MicroserviceRequest<
    Queue extends MessageQueues,
    Pattern extends MessageQueuePatterns[Queue]
  > = MessageQueueMap[Queue][Pattern]['request']

  /**
  * Helper type for microservice responses.
  */
  export type MicroserviceResponse<
    Queue extends MessageQueues,
    Pattern extends MessageQueuePatterns[Queue]
  > = MessageQueueMap[Queue][Pattern]['response']
  ```
  - You can utilize these helper types in two ways in your microservice-server or directly without going through the maps.
  ```typescript
  import { Controller } from '@nestjs/common'
  import { MessagePattern } from '@nestjs/microservices'

  import { DefaultMicroservice } from './default.service'

  import {
    AppPattern,
    MicroserviceRequest,
    MicroserviceResponse,
    MessageQueues
  } from '@my-scope/my-common-package'

  @Controller()
  export class DefaultMicrocontroller {
    constructor (private readonly defaultMicroservice: DefaultMicroservice) {}

    @MessagePattern(AppPattern.APP_DEFAULT)
    public default (
      options: MicroserviceRequest<MessageQueues.APP_QUEUE, AppPattern.APP_DEFAULT>
    ): Promise<MicroserviceResponse<MessageQueues.APP_QUEUE, AppPattern.APP_DEFAULT>> {
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
    constructor (private readonly defaultMicroservice: DefaultMicroservice) {}

    @MessagePattern(AppPattern.APP_DEFAULT)
    public default (
      options: AppMessage[AppPattern.APP_DEFAULT]['request']
    ): Promise<AppMessage[AppPattern.APP_DEFAULT]['response']> {
      return this.defaultMicroservice.default(options)
    }
  }
  ```


- Import the module itself and since the current default is RMQ, pass in the which queues you want to connect for this instance.
```typescript
import {  MicroserviceProviderModule } from '@webundsoehne/nestjs-util/dist/microservices'

 @Module({
   imports: [
      MicroserviceProviderModule.forRoot({ queue: [ ...THE_QUEUES_YOU_WANT_TO_IMPORT ] }),
      ]
  })
  export class ServerModule {}
```

- This will automatically create a client service, `MicroserviceProviderService`, with the specified clients embeded inside.

- Then you can use the client in any service by injecting it. Everything will be autotyped if you use the helper type as well.
  - You can inject client service through its class.
  ```typescript
  import { MicroserviceClient, MicroserviceResponse, MicroserviceProviderService } from '@my-scope/my-common-package'
  import { Injectable, Inject } from '@nestjs/common'

  @Injectable()
  export class DefaultService {
    constructor (@Inject(MicroserviceProviderService) private readonly msp: MicroserviceClient) {}

    public default (): Promise<MicroserviceResponse<queue, pattern>> {
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
    constructor (@Inject('MY_CLIENT_TOKEN') private readonly msp: MicroserviceClient) {}

    public default (): Promise<MicroserviceResponse<queue, pattern>> {
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


**This module is exported from `@webundsoehne/nestjs-util/dist/microservices` and through index to not break compatability with the projects that does not have `@nestjs/microservices` installed.**

### Pipes

Extended pipes provide capabilities over the default ones for interacting with this library better.

#### Validation Pipe
This validation pipe extends the default pipe for `class-validator` while it also provides a way to override the settings for a given path utilizing the accompanying [decorator](#decorators).

__Usage__

This can either used with a `useClass` or to extend the options `useFactory`. The default `ValidationPipeOptions` are `{ whitelist: true }`.

```typescript
import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ExtendedValidationPipe } from '@webundsoehne/nestjs-util'


@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ExtendedValidationPipe
    },
  ]
})
export class ServerModule {}
```

### Exception-Filters

We implemented a generic `ExceptionFilter` called `GlobalExceptionFilter`, which catches all errors and set the payload to am user friendly information.
The real exception will be just logged in `debug` logger mode.

__Usage__

```
import { GlobalExceptionFilter } from '@webundsoehne/nestjs-util'

@Module({
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }]
})
class ServerModule implements NestModule {}
```

#### Http

The `HttpExceptionFilter` extends from the `GlobalExceptionFilter` and just catches all `HttpException` errors.
It just overwrites the protected `payload()` method, which builds the message for the user.

__Usage__

```
import { HttpExceptionFilter, GlobalExceptionFilter } from '@webundsoehne/nestjs-util'

@Module({
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }]
})
class ServerModule implements NestModule {}
```

#### Bad-Request

The `BadRequestExceptionFilter` extends from the `GlobalExceptionFilter` and just catches `BadRequestException` errors.
This will handle the complex validation error messages (`ValidationError`) in the overwritten `payload()` method, which just happens on `BadRequestException` errors.

We don't handle them in the normal `HttpExceptionFilter`, because of performance reasons.

__Usage__

> I hope you recognized that the order of the exception filters, is required.

```
import { BadRequestExceptionFilter, HttpExceptionFilter, GlobalExceptionFilter } from '@webundsoehne/nestjs-util'

@Module({
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }, {
    provide: APP_FILTER,
    useClass: BadRequestExceptionFilter
  }]
})
class ServerModule implements NestModule {}
```

#### GraphQL Error Parser
Since `nest.js` lets `GraphQL` handle its errors its own way, `graphqlErrorParser` is just a function instead of a filter. This will format the errors in the same way of the HTTP errors so you can also throw `HTTP_STATUS` errors instead of plain `GraphQLError` for more distinction and using the status code directly in the frontend. It will also add the GraphQL error field of which field this error is comming from.

__Usage__

Just add the error parser to the GraphQL Module itself.

```typescript
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLErrorParser } from '@webundsoehne/nestjs-util/dist/graphql'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    GraphQLModule.forRoot({
      formatError: GraphQLErrorParser,
    })
  ]
})
export class ServerModule { }
```

**This module is exported from `@webundsoehne/nestjs-util/dist/graphql` and through index to not break compatability with the projects that does not have `graphql` installed.**

#### RPC Global Exception
This filter will handle errors from microservices. If you use `GlobalExceptionFilter` on front of it will format the errors in the same way as the RESTFUL API and you can also throw `HTTP_STATUS` exceptions. This filter will also output which microservice this error is coming from for convienece of debugging.

__Usage__

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

**This module is exported from `@webundsoehne/nestjs-util/dist/microservices` and through index to not break compatability with the projects that does not have `@nestjs/microservices` installed.**

### Cache-Lifetime

The interceptor sets the cache-lifetime information of the response as it was configured.
The configuration depends normally by project and environment.

It will add a function to the request state `request.state.setCacheLifetime()`, with that you can set a customize lifetime for each request.

__Usage__

```
import { RequestProfilerInterceptor } from '@webundsoehne/nestjs-util'

@Module({
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: RequestProfilerInterceptor
  }]
})
class ServerModule implements NestModule {}
```

__setCacheLifetime()__

This function takes 2 parameters, where the second one is optional.

Name             | Type    | Optional | Description
---------------  | ------- | -------- | -----------
lifetime         | Number  | false    | The lifetime of the cache in seconds
useExpiresHeader | Boolean | true     | If `true` the `expiresHeader` header will be set, otherwise the `cacheControlHeader`, be default it uses the configured value

__Configuration__

> The default values only exists in out skeleton project.

Key                                 | Type    | Default         | Description
----------------------------------  | ------- | --------------- | ------------
cacheLifetime.defaultExpiresHeader  | Boolean | false           | If `true` the `expiresHeader` header will be set, otherwise the `cacheControlHeader`
cacheLifetime.defaultLifetime       | Number  | 0               | This value may set a default cache lifetime, if there was not set any before
cacheLifetime.expiresHeader         | String  | 'Expires'       | The header key for the `expiresHeader`
cacheLifetime.cacheControlHeader    | String  | 'Cache-control' | The header key for the `cacheControlHeader`


### Request-Profiler

On `debug` logger level the request profile informs you when an request got started and when it was finished.
It also logs down the information, how many seconds the request took.

__Usage__

```
import { RequestProfilerInterceptor } from '@webundsoehne/nestjs-util'

@Module({
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: RequestProfilerInterceptor
  }]
})
class ServerModule implements NestModule {}
```

__Example__

```
[2020-01-01T12:00:00.000Z] [debug] [RequestProfilerInterceptor] - GET /v1/hello/world starting
[2020-01-01T12:00:00.025Z] [debug] [RequestProfilerInterceptor] - GET /v1/hello/world finished - took: 0.0250 sec
```

## Stay in touch

* Author: [Backend Team](mailto:backend@webundsoehne.com)
* Website: [Web & Söhne](https://webundsoehne.com)
