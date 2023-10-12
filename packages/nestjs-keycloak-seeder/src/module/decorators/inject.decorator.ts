import { Inject } from '@nestjs/common'

import { KeycloakSeederService } from '@module/keycloak-seeder.service'

/**
 * Injects Keyclaok admin instance initiated to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectKeycloakSeederService () {
  return Inject(KeycloakSeederService)
}
