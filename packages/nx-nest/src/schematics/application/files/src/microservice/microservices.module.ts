import { RpcGlobalExceptionFilter, ExtendedValidationPipe } from '@cenk1cenk2/nestjs-utils'
import { Module, NestModule, ClassSerializerInterceptor } from '@nestjs/common'
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GlobalModules } from '@root/global.modules'
import { getDatabaseOptions } from '@root/utils/database'

import * as modules from './child.modules'

export function createMicroserviceModule (mock = false): new (mock: boolean) => NestModule {
  @Module({
    providers: [
      {
        provide: APP_PIPE,
        useClass: ExtendedValidationPipe
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor
      },
      {
        provide: APP_FILTER,
        useClass: RpcGlobalExceptionFilter
      }
    ],
    imports: [ GlobalModules, TypeOrmModule.forRoot({ ...getDatabaseOptions(mock) }), ...Object.values(modules) ]
  })
  class MicroservicesModule implements NestModule {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async configure (): Promise<any> {}
  }

  return MicroservicesModule
}
