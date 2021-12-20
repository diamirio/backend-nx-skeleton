import { Inject } from '@nestjs/common'

import { KEYCLOAK_ADMIN_INSTANCE } from '@admin/admin.constants'

/**
 * Injects Keyclaok admin instance initiated to the service.
 */
export function InjectKeycloak (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(KEYCLOAK_ADMIN_INSTANCE)
}
