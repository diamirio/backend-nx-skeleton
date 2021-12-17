import { Module } from '@nestjs/common'

import { KeycloakSeederService } from './keycloak-seeder.service'
import { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'
import { KeycloakAdminModule, KeycloakAdminOptions } from '@webundsoehne/nestjs-keycloak'
import { ConfigService } from '@webundsoehne/nestjs-util'

@Module({
  imports: [ KeycloakAdminModule.register(ConfigService.get<KeycloakAdminOptions>('keycloak.admin')) ],
  providers: [ KeycloakSeederService, KeycloakAdminSeederTools ],
  exports: [ KeycloakSeederService ]
})
export class KeycloakSeederModule {}
