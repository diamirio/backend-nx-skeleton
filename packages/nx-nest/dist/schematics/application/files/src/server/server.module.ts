import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import {
  ConfigService,
  BadRequestExceptionFilter,
  HttpExceptionFilter,
  GlobalExceptionFilter,
  InternalModule,
  MaintenanceMiddleware,
  MaintenanceModule,
  CacheLifetimeHelperInterceptor,
  RequestProfilerInterceptor,
  SetApiInfoHeaderMiddleware,
  setEnvironmentVariables,
  ExtendedValidationPipe
} from '@webundsoehne/nestjs-util'

import { ServerController } from './server.controller'
import { ServerService } from './server.service'

export function createServerModule () {
  @Module({
    controllers: [ServerController],
    providers: [
      ServerService,
      ConfigService,
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
      },
      {
        provide: APP_PIPE,
        useClass: ExtendedValidationPipe
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: CacheLifetimeHelperInterceptor
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: RequestProfilerInterceptor
      }
    ],
    imports: [InternalModule, MaintenanceModule]
  })
  class ServerModule implements NestModule {
    async configure (consumer: MiddlewareConsumer): Promise<any> {
      await setEnvironmentVariables()

      consumer
        .apply(MaintenanceMiddleware, SetApiInfoHeaderMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
  }

  return ServerModule
}
