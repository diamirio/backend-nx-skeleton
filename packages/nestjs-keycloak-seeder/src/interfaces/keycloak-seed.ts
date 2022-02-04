import { Logger } from '@nestjs/common'

import type { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'

/**
 * A singular seed that should be extended from, for seeding Keycloak.
 */
export abstract class KeycloakSeed {
  protected logger: Logger = new Logger(this.constructor.name)

  constructor (protected keycloak: KeycloakAdminSeederTools) {}

  abstract run (): Promise<void>
}
