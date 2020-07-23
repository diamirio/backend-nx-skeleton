<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

@webundsoehne/nestjs-util
===
[![Version](https://img.shields.io/npm/v/init-cli.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util)
[![Downloads/week](https://img.shields.io/npm/dw/init-cli.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util)

## Description

This is a collection of useful modules on creating a [Nest](https://github.com/nestjs/nest) project.
Mostly all of this modules are used by the in-house boilerplate of Web & Söhne.

## Publishing

On each Git tag commit to this repo, the source-code will be automatically transpiled and published to [NPM](https://www.npmjs.com/~ws-admin).

## Modules

* [Internal](#internal)
  * [Status](#internal-status)
  * [Changelog](#internal-changelog)
* [Maintenance](#maintenance)
  * [Middleware](#maintenance-middleware)
  * [Locker](#maintenance-locker)
* [Info-Header](#info-header)
* [Config](#config)
* [Logger](#logger)
* [Swagger](#swagger)
* [Decorators](#decorators)
* [Pipes](#pipes)
* [Exception-Filter](#exception-filter)
  * [Http](#exception-filter-http)
  * [Bad-Request](#exception-filter-bad-request)
* [Cache-Lifetime](#cache-lifetime)
* [Request-Profiler](#request-profile)

### Internal <a name="internal"></a>

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


#### Status <a name="internal-status"></a>

The status endpoint returns the current API version set during the process environment and the last modification of the `.last-update` in your root directory.
The version will be set with the util function `setEnvironmentVariables()` read from `package.json` and the file will normally be generated/modified during the deployment process.
You may change this value with the `misc.lastUpdateFile` configuration.

#### Changelog <a name="internal-changelog"></a>

This endpoint simply reads and response the `CHANGELOG.md` from your root directory.
You can change the filepath with the configuration value `misc.changelogFile`.


### Maintenance <a name="maintenance"></a>

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

#### Locker <a name="maintenance-locker"></a>

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


#### Middleware <a name="maintenance-middleware"></a>

The middleware of the maintenance module, uses directly the `MaintenanceService`, to check if there exists a lock file and raises the correct exception. You will see the implementation in the usage block above.

### Info-Header <a name="info-header"></a>

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

### Config <a name="config"></a>

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

### Logger <a name="logger"></a>

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

### Swagger <a name="swagger"></a>

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

### Decorators <a name="decorators"></a>
Decorates provide a way to inject or override data on the function level.

#### Validation Override
This decorator provides a way to override the supplied Validation Pipe on a function basis.

__Usage__

Controller has to have the decorator on the designated path to designate the `class-validator` group.

```typescript
/* ... */
import { OverrideValidationOptions } from '@webundsoehne/nestjs-util'

@Controller()
export class SomeController {
  @Post('some/path')
  @OverrideValidationOptions({ groups: [ 'some:group' ] })
  public someFunction (): Promise<void> {
    return
  }
}
```

The counter-part of group designation has to be in the given class that utilizes `class-validator`.

```typescript
/* ... */
export class SomeExtendedEntity extends SomeEntity {
  @IsNotEmpty()
  @IsOptional({ groups: [ 'some:group' ] })
  dependsOnGroup?: string
}
```

### Pipes <a name="pipes"></a>

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

### Exception-Filters <a name="exception-filter"></a>

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

#### Http <a name="exception-filter-http"></a>

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

#### Bad-Request <a name="exception-filter-bad-request"></a>

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

### Cache-Lifetime <a name="cache-lifetime"></a>

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


### Request-Profiler <a name="request-profile"></a>

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
