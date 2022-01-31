import type { DynamicModule } from '@nestjs/common'
import { Global, Module } from '@nestjs/common'

import { KEYCLOAK_ADMIN_INSTANCE, KEYCLOAK_ADMIN_OPTIONS } from './admin.constants'
import type { KeycloakAdminOptions } from './admin.interfaces'
import { KeycloakAdminService } from './admin.service'

/**
 * KeycloakAdminModule provides the Keycloak client to whole application, where you can perform any
 * modification the Keycloak itself.
 */
@Global()
@Module({})
export class KeycloakAdminModule {
  static register (options: KeycloakAdminOptions): DynamicModule {
    return {
      module: KeycloakAdminModule,
      global: true,
      providers: [
        {
          provide: KEYCLOAK_ADMIN_OPTIONS,
          useValue: options ?? {}
        },
        {
          provide: KEYCLOAK_ADMIN_INSTANCE,
          useFactory: (options: KeycloakAdminOptions): KeycloakAdminService => {
            return new KeycloakAdminService(options)
          },
          inject: [ KEYCLOAK_ADMIN_OPTIONS ]
        }
      ],
      exports: [ KEYCLOAK_ADMIN_INSTANCE, KEYCLOAK_ADMIN_OPTIONS ]
    }
  }
}
