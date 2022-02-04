import type { DynamicModule } from '@nestjs/common'
import { Global, Module } from '@nestjs/common'
import type { Keycloak } from 'keycloak-connect'
import KeycloakConnect from 'keycloak-connect'

import { KEYCLOAK_CONNECT_INSTANCE, KEYCLOAK_CONNECT_OPTIONS } from './connect.constants'
import type { KeycloakConnectOptions } from './connect.interfaces'

/**
 * KeycloakConnectModule provides the Keycloak API to validate user authentication through a backend client.
 * This client is usually a private client with the token authentication flow in Keycloak.
 */
@Global()
@Module({})
export class KeycloakConnectModule {
  static register (options: KeycloakConnectOptions): DynamicModule {
    return {
      module: KeycloakConnectModule,
      global: true,
      providers: [
        {
          provide: KEYCLOAK_CONNECT_OPTIONS,
          useValue: options
        },
        {
          provide: KEYCLOAK_CONNECT_INSTANCE,
          useFactory: (options: KeycloakConnectOptions): Keycloak => {
            const keycloak: Keycloak = new KeycloakConnect({}, options as any)

            keycloak.accessDenied = (request: any, _response: any, next?: () => void): void => {
              request.resourceDenied = true

              if (typeof next === 'function') {
                next()
              }
            }

            return keycloak
          },
          inject: [KEYCLOAK_CONNECT_OPTIONS]
        }
      ],
      exports: [KEYCLOAK_CONNECT_OPTIONS, KEYCLOAK_CONNECT_INSTANCE]
    }
  }
}
