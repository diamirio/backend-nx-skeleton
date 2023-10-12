import { Inject } from '@nestjs/common'

import { KEYCLOAK_ADMIN_INSTANCE } from '@admin/admin.constants'

/**
 * Injects Keyclaok admin instance initiated to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectKeycloak () {
  return Inject(KEYCLOAK_ADMIN_INSTANCE)
}
