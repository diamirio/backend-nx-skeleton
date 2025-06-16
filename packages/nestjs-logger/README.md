<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# nestjs-logger

<!-- TOC -->
* [nestjs-logger](#nestjs-logger)
  * [Description](#description)
  * [Usage](#usage)
  * [Options](#options)
    * [Log-Level](#log-level)
    * [Formats](#formats)
    * [ClsService](#clsservice)
  * [Migration](#migration)
<!-- TOC -->

## Description

Custom logger service based on [winston](https://github.com/winstonjs/winston.

Details from winston read-me:
- Formats: [winston#formats](https://github.com/winstonjs/winston?tab=readme-ov-file#formats)
- Transport: [winston#transports](https://github.com/winstonjs/winston?tab=readme-ov-file#transports)

## Usage

Construct the `WinstonLogger` with an optional config during creation of the nest-application:

```typescript
import { WinstonLogger } from '@diamir/nestjs-logger'

const app = await NestFactory.create(
  ServerModule,
  {
    logger: new WinstonLogger()
  }
)
```

After initialisation use the nest `Logger` as usual, to get the customised output.

## Options

Available options and their default values.

```typescript
import { LogLevel, PrettyFormat, transports, WinstonLogger } from '@diamir/nestjs-logger'

new WinstonLogger({
  context: 'WinstonLogger', // override the default context
  logLevel: LogLevel.debug, // set the output level
  traceLogLevel: LogLevel.verbose, // set the output level for stack-trace
  clsService: undefined, // (optional) link to the nestjs-cls service to log request ids
  format: undefined, // (optional) default console transport output format
  transports: [new transports.Console({ format: PrettyFormat })] // set custom winston transports
})
```

### Log-Level

From least to most log output.

| **level** |
|-----------|
| none      |
| error     |
| warn      |
| info      |
| verbose   |
| debug     |

Hint:<br>
- `none` sets winston to `silent` and will not output any logs 
- `info` is equal to `log`/`Logger.log()`

### Formats

Predefined custom output formats<br>
Default output includes timestamp, context, message

- **PrettyFormat**: `[2025-09-25T07:09:44.496Z] [info] [SampleService] - Example log-message`
- **JsonFormat**: `{"context":"SampleService","level":"info","message":"Example log-message","splat":[],"timestamp":"2025-09-25T07:19:09.874Z"}`

**BaseFormat** used as base for the custom format.

e.g.
```typescript
import { BaseFormat, format } from '@diamir/nestjs-logger'

const CustomFormat = format.combine(
  BaseFormat,
  format.ms(),
  format.simple()
)
```

### Transports

By default, the `Console` transport is used with the `format` set in the `format` option or `PrettyFormat`.

To change the transports, pass a customised array in the options

```typescript
import { JsonFormat, PrettyFormat, transports, WinstonLogger } from '@diamir/nestjs-logger'

// extend the default logger with a seconds transport
new WinstonLogger({
  transports: [ 
    new transports.Console({ format: PrettyFormat }),
    new transports.File({ format: JsonFormat, file: 'server.logs' })
  ]
})

// override the default logger with new transports
new WinstonLogger({
  transports: [ 
    new transports.File({ format: JsonFormat, file: 'server.logs' }),
    new transports.File({ format: JsonFormat, file: 'server_error.logs', level: 'error' })
  ]
})
```

### ClsService

You can use the [nestjs-cls](https://papooch.github.io/nestjs-cls/) package to include the current request-id in the logs, to see which log belongs to which request.

Fist add the `nestjs-cls` dependency, next set up the `ClsModule` in the server/application module and set the `generateId` option to `true`

e.g.
```typescript
ClsModule.forRoot({
  global: true,
  middleware: {
    mount: true,
    generateId: true
  }
})
```

Finally update the `WinstonLogger` options to set the `clsService` like

```typescript
import { WinstonLogger } from '@diamir/nestjs-logger'
import { ClsServiceManager } from 'nestjs-cls'

new WinstonLogger({
  clsService: ClsServiceManager.getClsService()
})
```

## Migration

To migrate from the old `@webundsoehne/nestjs-util` to `@diamir/nestjs-logger`:
- Change `LoggerService` class to `WinstonLogger`
- manually link the `logLevel` in the class options (does not pull it via `ConfigService` any more)
- update how the `clsService` is set (drop `setClsService`, move to class options)
