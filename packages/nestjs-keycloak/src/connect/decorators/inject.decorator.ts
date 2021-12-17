import { Inject } from '@nestjs/common'

import { KEYCLOAK_CONNECT_INSTANCE, KEYCLOAK_CONNECT_OPTIONS } from '@connect/index'

/**
 * Injects Keyclaok connect instance initiated to the service.
 */
export function InjectKeycloakConnect (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(KEYCLOAK_CONNECT_INSTANCE)
}

/**
 * Injects Keyclaok connect instance options initiated to the service.
 */
export function InjectKeycloakConnectOptions (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(KEYCLOAK_CONNECT_OPTIONS)
}
