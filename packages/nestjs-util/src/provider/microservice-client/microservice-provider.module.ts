import { DynamicModule, FactoryProvider, Global, Module } from '@nestjs/common'
import { ClientProviderOptions, ClientProxyFactory } from '@nestjs/microservices'

import { MicroserviceProviderModuleOptions } from './microservice-provider.interface'
import { MicroserviceProviderService } from './microservice-provider.service'
import { provideMessageQueueClient } from './utils/microservice-client.util'

@Global()
@Module({})
export class MicroserviceProviderModule {
  /**
   * Provides a message queue client and a service to the whole application.
   * @param options
   */
  static forRoot (options: MicroserviceProviderModuleOptions): DynamicModule {
    const clients: FactoryProvider<ClientProxyFactory>[] = !options.provider
      ? provideMessageQueueClient(options.queue)
      : options.provider(options.queue)

    const tokens = clients.map((c) => c.provide)

    const clientServices: FactoryProvider<MicroserviceProviderService<any, any, any>> = {
      provide: MicroserviceProviderService,
      useFactory: (...clients: ClientProviderOptions[]) => {
        // can not get the provider name in here so we have to inject it a bit stupidly
        return new MicroserviceProviderService(clients, tokens as string[])
      },
      inject: [ ...tokens ]
    }

    return {
      global: true,
      module: MicroserviceProviderModule,
      providers: [ clientServices, ...clients ],
      exports: [ clientServices.provide, ...clients.map((p) => p.provide) ]
    }
  }
}
