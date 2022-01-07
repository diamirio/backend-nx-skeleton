import { DynamicModule, Global, Module } from '@nestjs/common'

import { KeycloakSeederService } from './keycloak-seeder.service'
import { KEYCLOAK_SEEDER_SEEDS } from '@constants/injection.constants'
import { KeycloakSeeds } from '@interfaces/keycloak-seed.interface'
import { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'

/**
 * KeycloakAdminModule provides the Keycloak client to whole application, where you can perform any
 * modification the Keycloak itself.
 */
@Global()
@Module({})
export class KeycloakSeederModule {
  static register (seeds: KeycloakSeeds): DynamicModule {
    return {
      module: KeycloakSeederModule,
      global: true,
      providers: [
        KeycloakSeederService,
        KeycloakAdminSeederTools,
        {
          provide: KEYCLOAK_SEEDER_SEEDS,
          useValue: seeds
        }
      ],
      exports: [ KeycloakSeederService ]
    }
  }
}
