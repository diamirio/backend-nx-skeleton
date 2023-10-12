import { Inject } from '@nestjs/common'

import { KEYCLOAK_CONNECT_INSTANCE, KEYCLOAK_CONNECT_OPTIONS } from '@connect/connect.constants'

/**
 * Injects Keyclaok connect instance initiated to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectKeycloakConnect () {
  return Inject(KEYCLOAK_CONNECT_INSTANCE)
}

/**
 * Injects Keyclaok connect instance options initiated to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectKeycloakConnectOptions () {
  return Inject(KEYCLOAK_CONNECT_OPTIONS)
}
