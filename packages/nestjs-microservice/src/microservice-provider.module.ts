import { DynamicModule, Module, Type } from '@nestjs/common'

import { BaseMicroserviceProvider } from './base/base-microservice-provider'
import { ProviderOptions } from './interface/provider-options.interface'
import { PROVIDER_OPTIONS } from './provider.constants'

@Module({})
export class MicroserviceProviderModule {
  static forRoot(options: ProviderOptions, providers: Type<BaseMicroserviceProvider<string>>[]): DynamicModule {
    return {
      global: options?.global ?? true,
      module: MicroserviceProviderModule,
      providers: [
        {
          provide: PROVIDER_OPTIONS,
          useValue: options
        },
        ...providers
      ],
      exports: providers
    }
  }
}
