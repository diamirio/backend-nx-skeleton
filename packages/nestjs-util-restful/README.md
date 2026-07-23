# nestjs-util-restful

## Description

Set of utils/helpers for restful nestjs setups.

---

<!-- TOC -->
* [nestjs-util-restful](#nestjs-util-restful)
  * [Description](#description)
  * [Filter](#filter)
    * [GlobalExceptionFilter](#globalexceptionfilter)
    * [BadRequestFilter](#badrequestfilter)
    * [Extra](#extra)
    * [Formatter](#formatter)
    * [Options](#options)
    * [Example](#example)
  * [Interceptor](#interceptor)
  * [InternalModule](#internalmodule)
  * [Swagger](#swagger)
* [Migration](#migration)
  * [Filter](#filter-1)
  * [InternalModule](#internalmodule-1)
  * [Swagger](#swagger-1)
* [Links](#links)
<!-- TOC -->

---

## Filter

Hint: The ordering of the filter-provider is relevant (see full-example below)

These filter are for the api-server (and bg-task) only, in a microservice serve throw `RpcException` and let the nest default filter handle it.

### GlobalExceptionFilter

The main filter that catches any error not yet processed.<br>
Can be configured to push those errors to sentry too. (see [Options](#options))

### BadRequestFilter

Catching `BadRequestExceptions` and prepare a response payload that supports the `ValidationPipe` errors.

### Extra

- `EntityNotFoundExtra`: Catch typeorm entity-not-found error thrown when using `.findOneOrFail()`

This is not available as a filter itself, because of the optional `typeorm` dependency. Therefore, you must initialise the filter yourself:

```typescript
import { EntityNotFoundError } from 'typeorm'
import { EntityNotFoundExtra } from '@diamir/nestjs-util-restful'
import { Catch } from '@nestjs/common'

@Catch(EntityNotFoundError)
class EntityNotFoundExceptionFilter extends EntityNotFoundExtra {}
```

Write your own custom filter by extending and implementing the `AbstractExceptionFilter`.

### Formatter

Beside the basic `application/json` you can opt-in to return `application/problem+json` instead (or write your own formatter extending the abstract `ErrorFormatter` class).

```typescript
import { ErrorFormatter, ProblemJsonFormatter } from '@diamir/nestjs-util-restful'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    {
      provide: ErrorFormatter,
      useClass: ProblemJsonFormatter
    }
  ]
})
```

### Options

You can customise the filter by providing an `ERROR_OPTIONS` object, to e.g. enable sentry for the `GlobalExceptionFilter` or disable logging for the `BadRequestFilter`

```typescript
import { ERROR_OPTIONS } from '@diamir/nestjs-util-restful'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    {
      provide: ERROR_OPTIONS,
      useValue: {
        GlobalExceptionFilter: {
          sentry: {
            enable: true,
            dsn: '...',
            environment: 'my-application'
          }
        },
        BadRequestFilter: {
          logging: false
        }
      }
    }
  ]
})
```

### Example

```typescript
import { rrorFormatter, ERROR_OPTIONS, GlobalExceptionFilter, BadRequestExceptionFilter, EntityNotFoundExceptionFilter, ProblemJsonFormatter } from '@diamir/nestjs-util-restful'
import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'

@Module({
  providers: [
    {
      provide: ERROR_OPTIONS,
      useValue: {
        GlobalExceptionFilter: {
          sentry: {
            enable: true,
            dsn: '...',
            environment: 'my-application'
          }
        }
      }
    },
    {
      provide: ErrorFormatter,
      useClass: ProblemJsonFormatter
    },
    // filter are processed from bottom to top
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter
    },
    // if an error occurs if passes 
    // 1. EntityNotFoundExceptionFilter
    // 2. BadRequestExceptionFilter
    // 3. GlobalExceptionFilter
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
```

## Interceptor

- `RequestProfilerInterceptor`: logs incoming requests and how long they took until their response

```typescript
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { RequestProfilerInterceptor } from '@diamir/nestjs-util-restful'

// restful server
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
[2020-01-01T12:00:00.000Z] [debug] [RequestProfilerInterceptor] - GET /v1/hello/world starting
[2020-01-01T12:00:00.025Z] [debug] [RequestProfilerInterceptor] - GET /v1/hello/world finished - 200 - took: 0.0250 sec
```

## InternalModule

Provides a controller with two `GET` endpoints
- `GET /internal/status`: provides status details as application-version and last-update date
- `GET /internal/changelog`: provides the changelog

```typescript
@Module({
  imports: [
    InternalModule.forRoot({
      lastUpdateFile: ConfigService.get('misc.lastUpdateFile'), // path to the file from which the last-updated timestamp will be read
      changelogFile: ConfigService.get('misc.changelogFile'), // path to the changelog file
      includeLastUpdate: true // if the last-update timestamp should be processed or not
    })
  ]
})
```

## Swagger

Set up the swagger documentation with a single function on application creation.

```typescript
import { ConfigService } from '@diamir/nestjs-config'
import { SwaggerService } from '@diamir/nestjs-util-restful'

const app = await NestFactory.create(/* ... */)

SwaggerService.enable(app, {
  path: '/internal/docs',
  title: 'Swagger Docu',
  description: 'Some helpful description of the project'
}, {
  basePath: 'http://localhost:3000',
  apiPath: 'api'
})
// customise `DocumentBuilder`
SwaggerService.enable(app, ConfigService.get('swagger'), ConfigService.get('url'), {
  customize: (builder) => builder.addBearerAuth()
})
```



# Migration

## Filter
- replace dependency
- drop deprecated filter (server and microservice-server)
- replace with new filter

## InternalModule
- replace dependency
- setup module with `.forRoot()` (see ConfigService paths in [InternalModule](#internalmodule))

## Swagger
- replace dependency
- update `SwaggerService.enable()` to new syntax
  - old: `enable(app, customize, swagger, url)`
  - new: `enable(app, swagger, url, customize)` (see [Swagger](#swagger))

# Links
- [Diamir](https://diamir.io/)
- [nestjs](https://nestjs.com/)
