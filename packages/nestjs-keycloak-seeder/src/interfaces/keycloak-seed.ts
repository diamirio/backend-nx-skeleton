import { Logger } from '@nestjs/common'

import { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'

/**
 * A singular seed that should be extended from, for seeding Keycloak.
 */
export abstract class KeycloakSeed {
  protected logger: Logger = new Logger(this.constructor.name)

  constructor (protected keycloak: KeycloakAdminSeederTools) {}

  public abstract run (): Promise<void>
}
