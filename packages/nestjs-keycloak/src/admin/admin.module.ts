import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

import { KEYCLOAK_ADMIN_INSTANCE, KEYCLOAK_ADMIN_OPTIONS } from './admin.constants'
import { KeycloakAdminOptions } from './admin.interfaces'
import { KeycloakAdminService } from './admin.service'

/**
 * KeycloakAdminModule provides the Keycloak client to whole application, where you can perform any
 * modification the Keycloak itself.
 */
@Global()
@Module({})
export class KeycloakAdminModule {
  protected static keycloakProvider: Provider = {
    provide: KEYCLOAK_ADMIN_INSTANCE,
    useFactory: (options: KeycloakAdminOptions) => new KeycloakAdminService(options),
    inject: [ KEYCLOAK_ADMIN_OPTIONS ]
  }

  static register (options: KeycloakAdminOptions): DynamicModule {
    const providerOptions = {
      provide: KEYCLOAK_ADMIN_OPTIONS,
      useValue: options
    }

    return {
      module: KeycloakAdminModule,
      providers: [ providerOptions, this.keycloakProvider ],
      exports: [ providerOptions, this.keycloakProvider ]
    }
  }
}
