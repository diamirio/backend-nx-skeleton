<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

# @webundsoehne/nestjs-util-restful

[![Version](https://img.shields.io/npm/v/@webundsoehne/nestjs-util.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nestjs-util.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nestjs-util)](https://npmjs.org/package/@webundsoehne/nestjs-util) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Description

This is a collection of useful modules on creating a [Nest](https://github.com/nestjs/nest) project. Mostly all of this modules are used by the in-house boilerplate of Web & Söhne.

## Modules

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Interceptors](#interceptors)
  - [Cache-Lifetime](#cache-lifetime)
  - [Request-Profiler](#request-profiler)
- [Providers](#providers)
  - [Swagger](#swagger)
- [Modules](#modules)
  - [Internal](#internal)
    - [Status](#status)
    - [Changelog](#changelog)
- [Stay in touch](#stay-in-touch)

<!-- tocstop -->

## Interceptors

### Cache-Lifetime

The interceptor sets the cache-lifetime information of the response as it was configured. The configuration depends normally by project and environment.

It will add a function to the request state `request.state.setCacheLifetime()`, with that you can set a customize lifetime for each request.

**Usage**

```typescript
import { RequestProfilerInterceptor } from '@webundsoehne/nestjs-util'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestProfilerInterceptor
    }
  ]
})
class ServerModule implements NestModule {}
```

**setCacheLifetime()**

This function takes 2 parameters, where the second one is optional.

| Name             | Type    | Optional | Description                                                                                                                   |
| ---------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| lifetime         | Number  | false    | The lifetime of the cache in seconds                                                                                          |
| useExpiresHeader | Boolean | true     | If `true` the `expiresHeader` header will be set, otherwise the `cacheControlHeader`, be default it uses the configured value |

**Configuration**

> The default values only exists in out skeleton project.

| Key                                | Type    | Default         | Description                                                                          |
| ---------------------------------- | ------- | --------------- | ------------------------------------------------------------------------------------ |
| cacheLifetime.defaultExpiresHeader | Boolean | false           | If `true` the `expiresHeader` header will be set, otherwise the `cacheControlHeader` |
| cacheLifetime.defaultLifetime      | Number  | 0               | This value may set a default cache lifetime, if there was not set any before         |
| cacheLifetime.expiresHeader        | String  | 'Expires'       | The header key for the `expiresHeader`                                               |
| cacheLifetime.cacheControlHeader   | String  | 'Cache-control' | The header key for the `cacheControlHeader`                                          |

### Request-Profiler

On `debug` logger level the request profile informs you when an request got started and when it was finished. It also logs down the information, how many seconds the request took.

**Usage**

```typescript
import { RequestProfilerInterceptor } from '@webundsoehne/nestjs-util'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestProfilerInterceptor
    }
  ]
})
class ServerModule implements NestModule {}
```

**Example**

```text
[2020-01-01T12:00:00.000Z] [debug] [RequestProfilerInterceptor] - GET /v1/hello/world starting
[2020-01-01T12:00:00.025Z] [debug] [RequestProfilerInterceptor] - GET /v1/hello/world finished - took: 0.0250 sec
```

## Providers

### Swagger

Automatically creates a Swagger documentation out of your controllers. For detailed information about the how-to, take a deeper look at the Nest [documentation](https://docs.nestjs.com/recipes/swagger).

**Usage**

```typescript
import { SwaggerService } from '@webundsoehne/nestjs-util'

const app = await NestFactory.create<INestApplication>(ServerModule, new FastifyAdapter())
SwaggerService.enable(app, options)
```

**Parameters**

| Name    | Required | Type             | Description                                                             |
| ------- | -------- | ---------------- | ----------------------------------------------------------------------- |
| app     | true     | INestApplication | The Nest application on which the documentation should be created       |
| options | false    | SwaggerOptions   | Options for customize the default created document                      |
| config  | false    | SwaggerConfig    | Standard configuration, which are required for creating a documentation |

**Types**

_SwaggerOptions_

| Name      | Required | Type     | Description                                                    |
| --------- | -------- | -------- | -------------------------------------------------------------- |
| customize | false    | Function | This function takes an DocumentBuilder modifies and returns it |

_SwaggerConfig_

| Name        | Required | Type    | Description                         |
| ----------- | -------- | ------- | ----------------------------------- |
| useHttps    | true     | Boolean | If the API is behind SSL encryption |
| basePath    | true     | String  | The base-path of the API            |
| path        | true     | String  | The sub-path to reach the API       |
| title       | true     | String  | The name of the API or the customer |
| description | true     | String  | A description for the whole API     |

## Modules

### Internal

This is a NestJS controller module for internal API endpoints, which can simply be added to each project. The controller provides you 2 endpoints `/status` and `/changelog`.

**Usage**

```typescript
import { InternalModule } from '@webundsoehne/nestjs-util'

@Module({
  imports: [InternalModule]
})
class ServerModule implements NestModule {
  async configure(): Promise<any> {
    await setEnvironmentVariables()
  }
}
```

**Configuration**

| Key                 | Type   | Default        | Description                                         |
| ------------------- | ------ | -------------- | --------------------------------------------------- |
| misc.changelogFile  | String | 'CHANGELOG.md' | The filepath of the project's changelog information |
| misc.lastUpdateFile | String | '.last-update' | The filepath of the projects's last update file     |

#### Status

The status endpoint returns the current API version set during the process environment and the last modification of the `.last-update` in your root directory. The version will be set with the util function `setEnvironmentVariables()` read from `package.json` and the file will normally be generated/modified during the deployment process. You may change this value with the `misc.lastUpdateFile` configuration.

#### Changelog

This endpoint simply reads and response the `CHANGELOG.md` from your root directory. You can change the filepath with the configuration value `misc.changelogFile`.

## Stay in touch

- Author: [Backend Team](mailto:backend@webundsoehne.com)
- Website: [Web & Söhne](https://webundsoehne.com)
