<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# nestjs-maintenance

<!-- TOC -->
* [nestjs-maintenance](#nestjs-maintenance)
  * [Description](#description)
  * [Usage](#usage)
    * [MaintenanceService](#maintenanceservice)
    * [Decorator](#decorator)
  * [Migration](#migration)
<!-- TOC -->

## Description

The maintenance module gives you the possibility to generate and remove a lock file,
as well as checking if the lock file exists and throwing a preconfigured `ServiceUnavailableException` error.

You may use the maintenance module anywhere in your project, e.g. for database migrations. (But make sure to access the same lock-file in each module)

## Usage

Set up the `MaintenanceModule` and `MaintenanceMiddleware` in the server/application module.

```typescript
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { MaintenanceMiddleware, MaintenanceModule } from '@diamir/nestjs-maintenance'

@Module({
  imports: [
    MaintenanceModule.forRoot({
      application: ConfigService.get('url.basePath'), // default: Application
      lockfilePath: ConfigService.get('misc.lockfile') // default: maintenance.lock
    })
  ]
})
class ServerModule implements NestModule {
  async configure(consumer: MiddlewareConsumer): Promise<any> {
    consumer.apply(MaintenanceMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
```

Now if a lockfile is present at the `lockfilePath`, the `ServiceUnavailableException` will be thrown.

### MaintenanceService

To create and remove the lockfile, use the `MaintenanceService` in any module.

| Name           | Return  | Description                           |
|----------------|---------|---------------------------------------|
| enable         | void    | Create the configured lock file       |
| disable        | void    | Remove the generated lock file        |
| isEnabled      | Boolean | Check if there is already a lock file |
| throwException | void    | Throw the preconfigured exception     |

### Decorator

Apply the `@UseMaintenanceLocker()` decorator on a method to wrap the original function inside a maintenance-lock
1. enable lock
2. execute method
3. disable lock

## Migration

To migrate from the old `@webundsoehne/nestjs-util` to `@diamir/nestjs-maintenance`:
- replace the imports
- change the `MaintenanceModule` imports to use the `.forRoot` method
