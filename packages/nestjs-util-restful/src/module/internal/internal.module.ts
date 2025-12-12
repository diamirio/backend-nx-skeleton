import { type DynamicModule, Module } from '@nestjs/common'

import type { InternalOptions } from './interface'
import { InternalController } from './internal.controller'
import { InternalService } from './internal.service'

@Module({})
export class InternalModule {
  static forRoot(options: InternalOptions): DynamicModule {
    return {
      module: InternalModule,
      controllers: [InternalController],
      providers: [
        {
          provide: InternalService,
          useValue: new InternalService(options)
        }
      ],
      exports: [InternalService]
    }
  }
}
