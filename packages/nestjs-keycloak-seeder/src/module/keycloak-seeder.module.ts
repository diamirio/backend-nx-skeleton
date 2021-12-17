import { DynamicModule, Global, Module } from '@nestjs/common'

import { KeycloakSeederService } from './keycloak-seeder.service'
import { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'
import { KeycloakAdminModule, KeycloakAdminOptions } from '@webundsoehne/nestjs-keycloak'

/**
 * KeycloakAdminModule provides the Keycloak client to whole application, where you can perform any
 * modification the Keycloak itself.
 */
@Global()
@Module({})
export class KeycloakSeederModule {
  static register (options: KeycloakAdminOptions): DynamicModule {
    return {
      module: KeycloakSeederModule,
      imports: [ KeycloakAdminModule.register(options) ],
      providers: [ KeycloakSeederService, KeycloakAdminSeederTools ],
      exports: [ KeycloakSeederService ]
    }
  }
}
