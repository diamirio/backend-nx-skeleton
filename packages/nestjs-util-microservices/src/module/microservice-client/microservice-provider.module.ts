import type { DynamicModule, FactoryProvider } from '@nestjs/common'
import { Global, Module } from '@nestjs/common'
import type { ClientProviderOptions } from '@nestjs/microservices'

import type { MicroserviceProviderModuleOptions } from './microservice-provider.interface'
import { MicroserviceProviderService } from './microservice-provider.service'
import type { ClientProxyRMQ } from './utils/client-rmq.proxy'
import { provideMessageQueueClient } from './utils/microservice-client.util'

@Global()
@Module({})
export class MicroserviceProviderModule {
  /**
   * Provides a message queue client and a service to the whole application.
   * @param options
   */
  static forRoot (options: MicroserviceProviderModuleOptions): DynamicModule {
    const clients: FactoryProvider<ClientProxyRMQ>[] = !options.provider ? provideMessageQueueClient(options.queue, options.clientOptions) : options.provider(options.queue)

    const tokens = clients.map((c) => c.provide)

    let clientServices: FactoryProvider<MicroserviceProviderService<any, any, any>>

    if (!options.disableService) {
      clientServices = {
        provide: options?.name ? options.name : MicroserviceProviderService,
        useFactory: (...clients: ClientProviderOptions[]): MicroserviceProviderService => {
          // can not get the provider name in here so we have to inject it a bit stupidly
          return new MicroserviceProviderService(clients, tokens as string[])
        },
        inject: [...tokens]
      }

      return {
        global: true,
        module: MicroserviceProviderModule,
        providers: [clientServices, ...clients],
        exports: [clientServices.provide, ...clients.map((p) => p.provide)]
      }
    }

    return {
      global: true,
      module: MicroserviceProviderModule,
      providers: [...clients],
      exports: [...clients.map((p) => p.provide)]
    }
  }
}
