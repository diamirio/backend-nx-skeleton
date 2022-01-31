import type { DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'

import { KeycloakSeederService } from './keycloak-seeder.service'
import { KEYCLOAK_SEEDER_SEEDS } from '@constants/injection.constants'
import type { KeycloakSeeds } from '@interfaces/keycloak-seed.interface'
import { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'
import { KeycloakAdminModule } from '@webundsoehne/nestjs-keycloak'

/**
 * KeycloakAdminModule provides the Keycloak client to whole application, where you can perform any
 * modification the Keycloak itself.
 */
@Module({})
export class KeycloakSeederModule {
  static register (seeds: KeycloakSeeds): DynamicModule {
    return {
      module: KeycloakSeederModule,
      imports: [ KeycloakAdminModule ],
      providers: [
        KeycloakSeederService,
        KeycloakAdminSeederTools,
        {
          provide: KEYCLOAK_SEEDER_SEEDS,
          useValue: seeds
        }
      ],
      exports: [ KeycloakSeederService, KeycloakAdminSeederTools ]
    }
  }
}
