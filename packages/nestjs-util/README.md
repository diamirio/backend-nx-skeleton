<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

# @webundsoehne/nestjs-util

[![Version](https://img.shields.io/npm/v/@webundsoehne/nestjs-util.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nestjs-util.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nestjs-util)](https://npmjs.org/package/@webundsoehne/nestjs-util) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Description

This is a collection of useful modules on creating a [Nest](https://github.com/nestjs/nest) project. Mostly all of this modules are used by the in-house boilerplate of Web & Söhne.

## Modules

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Decorators](#decorators)
  - [Retry Decorator](#retry-decorator)
  - [UseMaintenanceLocker Decorator](#usemaintenancelocker-decorator)
- [Filters](#filters)
  - [Http](#http)
  - [Bad-Request](#bad-request)
- [Middleware](#middleware)
  - [Info-Header](#info-header)
- [Modules](#modules)
  - [Maintenance](#maintenance)
- [Providers](#providers)
  - [Config](#config)
  - [Logger](#logger)
- [Pipes](#pipes)
  - [Validation Pipe](#validation-pipe)
- [Stay in touch](#stay-in-touch)

<!-- tocstop -->

## Decorators

### Retry Decorator

Wrap a class method with this decorator to retry it couple of more times. Useful for external service dependent tasks.

```typescript
@Timeout(MigrationTask.name, 0)
@Retry({
  name: MigrationTask.name,
  retry: 24,
  interval: 3 * 1000
})
async migrate(): Promise<void> {
  try {
    await this.connection.runMigrations({ transaction: 'all' })
  } catch (error) {
    this.logger.error(error.message)

    throw error
  }
}
```

### UseMaintenanceLocker Decorator

Whenever the given class method fires, it will also activate the maintenance mode through `MaintenanceModule`. For this `MaintenanceModule` should be injected in to the context of the given module.

```typescript
@Timeout(MigrationTask.name, 0)
@UseMaintenanceLocker(MigrationTask.name)
async migrate(): Promise<void> {
  try {
    await this.connection.runMigrations({ transaction: 'all' })
  } catch (error) {
    this.logger.error(error.message)

    throw error
  }
}
```

## Filters

We implemented a generic `ExceptionFilter` called `GlobalExceptionFilter`, which catches all errors and set the payload to am user friendly information. The real exception will be just logged in `debug` logger mode.

**Usage**

```typescript
import { GlobalExceptionFilter } from '@webundsoehne/nestjs-util'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ]
})
class ServerModule implements NestModule {}
```

### Http

The `HttpExceptionFilter` extends from the `GlobalExceptionFilter` and just catches all `HttpException` errors. It just overwrites the protected `payload()` method, which builds the message for the user.

**Usage**

```typescript
import { HttpExceptionFilter, GlobalExceptionFilter } from '@webundsoehne/nestjs-util'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
class ServerModule implements NestModule {}
```

### Bad-Request

The `BadRequestExceptionFilter` extends from the `GlobalExceptionFilter` and just catches `BadRequestException` errors. This will handle the complex validation error messages (`ValidationError`) in the overwritten `payload()` method, which just happens on `BadRequestException` errors.

We don't handle them in the normal `HttpExceptionFilter`, because of performance reasons.

**Usage**

> I hope you recognized that the order of the exception filters, is required.

```typescript
import { BadRequestExceptionFilter, HttpExceptionFilter, GlobalExceptionFilter } from '@webundsoehne/nestjs-util'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter
    }
  ]
})
class ServerModule implements NestModule {}
```

## Middleware

The middleware of the maintenance module, uses directly the `MaintenanceService`, to check if there exists a lock file and raises the correct exception. You will see the implementation in the usage block above.

### Info-Header

The information header middleware is a really short `NestMiddleware` which set the `X-Api-Name` and `X-Api-Version` response header out of the `process.env` data. Both environment variables will be set with the `setEnvironmentVariables` util function, which loads the information from the `package.json`.

**Usage**

```typescript
import { SetApiInfoHeaderMiddleware, setEnvironmentVariables } from '@webundsoehne/nestjs-util'

class ServerModule implements NestModule {
  async configure(consumer: MiddlewareConsumer): Promise<any> {
    await setEnvironmentVariables()

    consumer.apply(SetApiInfoHeaderMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
```

## Modules

### Maintenance

The maintenance module gives you the possibility to generete and remove a lock file, as well as checking if the lock file exists and throwing a preconfigured `ServiceUnavailableException` error. You may use the maintenance module anywhere in your project, e.g. for database migrations.

**Usage**

```typescript
import { MaintenanceMiddleware, MaintenanceModule } from '@webundsoehne/nestjs-util'

@Module({
  imports: [MaintenanceModule]
})
class ServerModule implements NestModule {
  async configure(consumer: MiddlewareConsumer): Promise<any> {
    consumer.apply(MaintenanceMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
```

**Methods**

| Name           | Return  | Description                           |
| -------------- | ------- | ------------------------------------- |
| enable         | void    | Create the configured lock file       |
| disable        | void    | Remove the generated lock file        |
| isEnabled      | Boolean | Check if there is already a lock file |
| throwException | void    | Throw the preconfigured exception     |

**Configuration**

> If there is no `misc.maintenanceNotification` set, it will be generated with following template string: <br />\`${url.basePath} is currently down for maintenance\`

| Key                          | Type   | Default            | Description                                                   |
| ---------------------------- | ------ | ------------------ | ------------------------------------------------------------- |
| url.basePath                 | String |                    | The base API url of your project                              |
| misc.maintenanceNotification | String | (see hint above)   | The notification, which will be thrown in case of maintenance |
| misc.lockfile                | String | 'maintenance.lock' | The filepath of the projects's maintenance lock file          |

## Providers

### Config

This is a NestJS service, which allows you to uses the great [config](https://github.com/lorenwest/node-config) library with decorators. But for scripts or in common no classes, you can use it normally too.

**Important**

> The `@Configurable()` has to be the last decorator before the function is initiated.

**Usage**

```typescript
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

**Usage**

Set an instance of the logger to the application during creation, as part of the `NestApplicationOptions`.

```typescript
import { LoggerService } from '@webundsoehne/nestjs-util'

const app = await NestFactory.create<INestApplication>(ServerModule, new FastifyAdapter(), {
  logger: new LoggerService()
})
```

After the logger got set to the application, all NestJS logging output, will be handled by our customized logger.

```typescript
import { Logger } from '@nestjs/common'

class CustomService {
  private readonly logger: Logger = new Logger(this.constructor.name)
  private readonly loggerWithoutContext: Logger = new Logger()

  constructor() {
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

## Pipes

Extended pipes provide capabilities over the default ones for interacting with this library better.

### Validation Pipe

This validation pipe extends the default pipe for `class-validator` while it also provides a way to override the settings for a given path utilizing the accompanying [decorator](#decorators).

**Usage**

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
    }
  ]
})
export class ServerModule {}
```

## Stay in touch

- Author: [Backend Team](mailto:backend@webundsoehne.com)
- Website: [Web & Söhne](https://webundsoehne.com)
