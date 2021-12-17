import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import KeycloakConnect, { Keycloak } from 'keycloak-connect'

import { KEYCLOAK_CONNECT_INSTANCE, KEYCLOAK_CONNECT_OPTIONS } from './connect.constants'
import { KeycloakConnectOptions } from './connect.interfaces'

/**
 * KeycloakConnectModule provides the Keycloak API to validate user authentication through a backend client.
 * This client is usually a private client with the token authentication flow in Keycloak.
 */
@Global()
@Module({})
export class KeycloakConnectModule {
  protected static keycloakProvider: Provider = {
    provide: KEYCLOAK_CONNECT_INSTANCE,
    useFactory: (options: KeycloakConnectOptions) => {
      const keycloak: Keycloak = new KeycloakConnect({}, options as any)

      keycloak.accessDenied = (request: any, _response: any, next?: () => void): void => {
        request.resourceDenied = true

        if (typeof next === 'function') {
          next()
        }
      }

      return keycloak
    },
    inject: [ KEYCLOAK_CONNECT_OPTIONS ]
  }

  static register (options: KeycloakConnectOptions): DynamicModule {
    const providerOptions = {
      provide: KEYCLOAK_CONNECT_OPTIONS,
      useValue: options
    }

    return {
      module: KeycloakConnectModule,
      providers: [ providerOptions, this.keycloakProvider ],
      exports: [ providerOptions, this.keycloakProvider ]
    }
  }
}
